function showWeather(response) {
  console.log(response);
  console.log(response.data);
  console.log(response.data.city);
  console.log(response.data.temperature.current);
  console.log(response.data.condition.description);

  let temperatureElement =document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

   let descriptionElement = document.querySelector("#description");
   descriptionElement.innerHTML = response.data.condition.description;

   let humidityElement = document.querySelector("#humidity");
   humidityElement.innerHTML = response.data.temperature.humidity;

   let windElement = document.querySelector("#wind");
   windElement.innerHTML =Math.round(response.data.wind.speed);

}
let apiKey = "b19t9a07a57a44df163do01147f91d11";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=Midrand&key=b19t9a07a57a44df163do01147f91d11&units=metric";

console.log(apiUrl);
axios.get(apiUrl).then(showWeather);
