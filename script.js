async function getWeather() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const coordinates = await getCoordinates(city);

    if (!coordinates) {
        alert("City not found!");
        return;
    }

    const { latitude, longitude } = coordinates;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data.current_weather, city);
    } catch (error) {
        alert("Unable to fetch weather data. Please try again later.");
    }
}

async function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return {
                latitude: data.results[0].latitude,
                longitude: data.results[0].longitude
            };
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

function displayWeather(weather, city) {
    document.getElementById('city-name').textContent = `Weather in ${city}`;
    document.getElementById('description').textContent = `Temperature: ${weather.temperature}°C`;
    document.getElementById('temperature').textContent = `Wind Speed: ${weather.windspeed} km/h`;
    document.getElementById('wind-speed').textContent = `Direction: ${weather.winddirection}°`;
}