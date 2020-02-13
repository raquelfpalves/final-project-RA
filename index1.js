let dateElement = document.querySelector("#date");
let currentTime = new Date();
let minutes = currentTime.getMinutes();
let hours = currentTime.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}

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
    "Saturday"
];
let day = days[currentTime.getDay()];

dateElement.innerHTML = `${day} ${hours}: ${minutes}`;

function temp(event) {
    event.preventDefault();
    let Tfahrenheit = document.querySelector("#temperature");
    Tfahrenheit.innerHTML = "68";
}

let tempF = document.querySelector("#fahrenheit-link");
tempF.addEventListener("click", temp);

function temperature(event) {
    event.preventDefault();

    let Tcelsius = document.querySelector("#temperature");
    Tcelsius.innerHTML = "20";
}

let tempC = document.querySelector("#celsius-link");
tempC.addEventListener("click", temperature);

function displayWeatherCondition(response) {
    console.log(response.data.main.temp);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = `${temperature}ºC`;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
        response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
        response.data.weather[0].main;
}

function searchCity(city) {
    let apiKey = "75fb66e318950ecccacc7fe99c8be68b";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeatherCondition);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);
    let h3 = document.querySelector("h3#city");
    h3.innerHTML = `${city}`;
}

function searchLocation(position) {
    let apiKey = "75fb66e318950ecccacc7fe99c8be68b";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&long=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Buenos Aires");
