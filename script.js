// import populateWeatherInfo from "./components.js";

const main = document.querySelector(".main");
const description = document.querySelector(".description");
const icon = document.querySelector(".icon");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const feelsLike = document.querySelector(".feels_like");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");

let array = [
  main,
  description,
  icon,
  wind,
  humidity,
  pressure,
  visibility,
  feelsLike,
  temp,
];

function populateWeatherInfo(weather) {
  weatherInfo.classList.add("show");
  city.innerText = weather.city;
  array.forEach((item) => {
    console.log(item);
    if (item.className == "icon") {
      item.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    } else item.innerText = weather[item.className];
  });
}

// /////////////////////////////////////////////////////////////////////

const body = document.querySelector("body");
const cityP = document.querySelector(".cityP");
const countryElement = document.querySelector(".country");
const form = document.querySelector(".request");
const locationInput = document.querySelector("#location-input");
const flagImg = document.querySelector(".flag");

const weatherKey = "4df722599bbfd761ba2462ee5f6b9fb5";
const flagAPI = "https://countryflagsapi.com/png/";
let latLong = {};
let weatherInfo = {};

let prevWeather;

async function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let main = data.main;
      let weather = data.weather[0];

      cityP.classList.add("show");
      body.classList.remove(prevWeather);
      body.classList.add(weather.main);
      prevWeather = weather.main;

      weatherInfo = {
        feels_like: main.feels_like,
        grnd_level: main.grnd_level,
        humidity: main.humidity,
        pressure: main.pressure,
        sea_lev: main.sea_lev,
        temp: main.temp,
        temp_max: main.temp_max,
        temp_min: main.temp_min,

        main: weather.main,
        description: weather.description,
        icon: weather.icon,

        wind: data.wind.speed,
        visibility: data.visibility,

        city: data.name,
      };
      populateWeatherInfo(weatherInfo);
    })
    .catch((error) => {
      console.log("Get Weather Error: ", error);
    });
}

fetch(
  `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${weatherKey}`
)
  .then((res) => res.json())
  .then((data) => console.log("Coord: ", data));

async function getLocation(event) {
  event.preventDefault();
  let location = locationInput.value;
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  try {
    let response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${weatherKey}`
    );
    let data = await response.json();
    let country = regionNames.of(data[0].country);
    countryElement.innerText = country;
    flagImg.src = flagAPI + country;
    latLong = {
      lat: data[0].lat,
      lon: data[0].lon,
    };
    getWeather(latLong.lat, latLong.lon);
  } catch (err) {
    console.log("Err: ", err);
    console.log("Try Again? ");
    alert(
      `Sorry! Can't find the city your searching for. It might not exist. 
       Please try again or try searching for another city.`
    );
  }
}

form.addEventListener("submit", (event) => getLocation(event));
let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
console.log(regionNames.of("SE"));
