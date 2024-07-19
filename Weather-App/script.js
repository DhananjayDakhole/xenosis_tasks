const apiKey = "6aba7fa6a71ba56b62160bd5e0a19f22";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

const weatherIcons = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Haze: "images/haze.png"
};

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        showError();
    }
}

function updateWeather(data) {
    cityElement.innerHTML = data.name;
    tempElement.innerHTML = `${Math.round(data.main.temp)}°C`;
    humidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed} km/h`;
    weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";
    weatherElement.style.display = "block";
    errorElement.style.display = "none";
}

function showError() {
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
