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

const weatherInfo = document.querySelector(".weather-info");

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
      item.src = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;
    } else item.innerText = weather[item.className];
  });
}

export default populateWeatherInfo;
