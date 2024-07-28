const showWeatherBtn = document.getElementById('show-weather');
const displayForecastBtn = document.getElementById('display-forecast');
const cityInput = document.getElementById('city');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('forecast-container');

showWeatherBtn.addEventListener('click', showWeather);
displayForecastBtn.addEventListener('click', displayForecast);

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

async function displayForecast() {
    const city = cityInput.value;
    const forecastResponse = await fetch(`${URL_FORECAST_WEATHER}${city}`);
    const forecastData = await forecastResponse.json();
    forecastContainer.innerHTML = '<h2>Weather Forecast</h2>';

    const forecastByDays = {};
    forecastData.list.forEach(item => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

        if (!forecastByDays[day]) {
            forecastByDays[day] = [];
        }

        forecastByDays[day].push(item);
    });

    for (let day in forecastByDays) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'forecast-day';

        const dayHeader = document.createElement('h3');
        dayHeader.textContent = day;
        dayDiv.appendChild(dayHeader);

        forecastByDays[day].forEach(item => {
            const card = document.createElement('div');
            card.className = 'card forecast-item';

            const time = new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const temp = `${item.main.temp}°C`;
            const description = item.weather[0].description;
            const icon = `${URL_WEATHER_ICON_PREFIX}${item.weather[0].icon}.png`;

            card.innerHTML = `
                <div class="card-content">
                    <div>
                        <strong>${time}</strong>
                        <p>${temp}</p>
                        <p>${description}</p>
                    </div>
                    <img src="${icon}" alt="${description}">
                </div>
            `;

            dayDiv.appendChild(card);
        });

        forecastContainer.appendChild(dayDiv);
    }
}
