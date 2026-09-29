function WeatherCard({ weather }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="weather-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />

      <h3>{Math.round(weather.main.temp)}°C</h3>

      <p>{weather.weather[0].description}</p>

      <div className="weather-details">
        <div>
          <strong>💧 Humidity</strong>
          <p>{weather.main.humidity}%</p>
        </div>

        <div>
          <strong>💨 Wind Speed</strong>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div>
          <strong>🌅 Sunrise</strong>
          <p>{formatTime(weather.sys.sunrise)}</p>
        </div>

        <div>
          <strong>🌇 Sunset</strong>
          <p>{formatTime(weather.sys.sunset)}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;