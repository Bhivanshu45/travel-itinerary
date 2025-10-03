// Utility to fetch weather data for a city and date using OpenWeather API
// Uses the 5-day/3-hour forecast endpoint

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function getWeatherForCityDate(city, date) {
  // date: 'YYYY-MM-DD'
  try {
    // Get city coordinates first
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoRes.json();
    if (!geoData[0]) return null;
    const { lat, lon } = geoData[0];

    // Get forecast data
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const forecastData = await forecastRes.json();
    if (!forecastData.list) return null;

    // Find the forecast closest to the requested date (by day)
    const targetDay = new Date(date).toISOString().slice(0, 10);
    const dayForecasts = forecastData.list.filter((item) =>
      item.dt_txt.startsWith(targetDay)
    );
    // Pick the forecast at noon if available, else first of the day
    let forecast = dayForecasts.find((item) =>
      item.dt_txt.includes("12:00:00")
    );
    if (!forecast && dayForecasts.length > 0) forecast = dayForecasts[0];
    if (!forecast) return null;

    return {
      temp: forecast.main.temp,
      description: forecast.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
      date: forecast.dt_txt,
    };
  } catch (err) {
    return null;
  }
}
