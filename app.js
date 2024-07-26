const showWeatherBtn = document.getElementById('show-weather');
const displayForecastBtn = document.getElementById('display-forecast');
const cityInput = document.getElementById('city');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');

showWeatherBtn.addEventListener('click', showWeather);


const URL_CURRENT_WEATHER = 'https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
const URL_FORECAST_WEATHER = 'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';
const URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/";


async function showWeather() {
    const city = cityInput.value;
    const reponse = await fetch(`${URL_CURRENT_WEATHER}${city}`);
    const weather = await reponse.json();
    const iconCode = weather.weather[0].icon;
    const iconImageUrl = `${URL_WEATHER_ICON_PREFIX}${iconCode}.png`;

        weatherContainer.innerHTML = `
            <div class="card">
                <h2>Current Weather in ${weather.name}</h2>
                <div class="card-content">
                    <img src=${iconImageUrl} />
                    <div>
                        <p>Description: ${weather.weather[0].description}</p>
                        <p>Humidity: ${weather.main.humidity}%</p>
                        <p>Pressure: ${weather.main.pressure} hPa</p>
                        <p>Current Temperature: ${weather.main.temp}°C</p>
                        <p>Min Temperature: ${weather.main.temp_min}°C</p>
                        <p>Max Temperature: ${weather.main.temp_max}°C</p>
                    </div>
                </div>
            </div>
        `;
} 



