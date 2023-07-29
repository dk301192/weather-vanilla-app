let cel = document.querySelector("#cel");
let city_text = document.querySelector("#city");

let far = document.querySelector("#far");
let searchText = document.querySelector("#search_txt");
let currBtn = document.querySelector("#curr_btn");
let l_update = document.querySelector("#l_update");
let desc = document.querySelector("#desc");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let temp = document.querySelector("#temp");
let w_img = document.querySelector("#w_img");
let form = document.querySelector("#search-form");
API_KEY = "8t35ea4b2360b052f2560cof39736f83";
API_URL = `https://api.shecodes.io/weather/v1/current?units=metric&key=${API_KEY}`;
let celsiusTemperature =0;
console.log(cel);

function formatDate(timestamp) {
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
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTempCel()
{
    far.classList.remove("active-unit");
    far.classList.add("inactive");
    
    cel.classList.remove("inactive");
    cel.classList.add("active-unit");
    temp.innerHTML = Math.round(celsiusTemperature);

}
function displayTempFar()
{
    cel.classList.remove("active-unit");
    cel.classList.add("inactive");
    
    far.classList.remove("inactive");
    far.classList.add("active-unit");
    let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
    temp.innerHTML = Math.round(fahrenheiTemperature);
  


}
cel.addEventListener("click",displayTempCel);
far.addEventListener("click",displayTempFar);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showWeatherData(response)
{

        
        celsiusTemperature = response.data.temperature.current;
      
        temp.innerHTML = Math.round(celsiusTemperature);
        city_text.innerHTML = response.data.city;
        desc.innerHTML = response.data.condition.description;
        humidity.innerHTML = `Humidity: ${response.data.temperature.humidity}`;
        wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed * 3.6)}`;
        l_update.innerHTML = `Last updated: ${formatDate(response.data.time * 1000)}`;
        w_img.setAttribute(
          "src",
          response.data.condition.icon_url
        );
        w_img.setAttribute("alt", response.data.condition.icon);
      }

      function fetchWeatherData(response) {
        let res = response.data.city;
        showWeatherData(response);
      }
    

function getSearchText(event)
{
    event.preventDefault();
    let city = searchText.value;
    let url = `${API_URL}&query=${city}`;
    axios.get(url).then(fetchWeatherData);
 

}



  function handlePosition(position) {
   let lat =  position.coords.latitude;
   let log = position.coords.longitude;
   let url = `${API_URL}&lat=${lat}&lon=${log}`
   axios.get(url).then(fetchWeatherData);


  }
  
  function showCurrentCityTemp(event){
    event.preventDefault();

  navigator.geolocation.getCurrentPosition(handlePosition);
  }


  let url = `${API_URL}&query=Nashik`;
  axios.get(url).then(fetchWeatherData);

  currBtn.addEventListener("click",showCurrentCityTemp)
  form.addEventListener("submit",getSearchText);
