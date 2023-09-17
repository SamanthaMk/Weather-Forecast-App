function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday;",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN","MON", "TUE", "WEN", "THU", "FRI", "SAT"];

return days[day];
} 


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

let forecastHTML = "";
forecast.forEach(function (forecastDay) {
  forecastHTML =
    forecastHTML +
    `
  <li>
   <span class="weather-forecast-date">${dayFormat(forecastDay.time)}</span>
   <img
     src="${forecastDay.condition.icon_url}"
          alt=""
          width="40"
   />
   <span class="weather-forecast-temp">${Math.round(forecastDay.temperature.maximum)}° ${Math.round(
      forecastDay.temperature.minimum)}°</span>
 </li>`;
})

forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b19t9a07a57a44df163do01147f91d11";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showWeather(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.city);
  console.log(response.data.temperature.current);
  console.log(response.data.condition.description);
  console.log(response.data.condition.icon_url);


  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = currentDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",response.data.condition.icon_url);

  celsiusTemperature = response.data.temperature.current;
  console.log(response);
  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "b19t9a07a57a44df163do01147f91d11";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let citySearchElement = document.querySelector("#city-search");
  search(citySearchElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Midrand");
