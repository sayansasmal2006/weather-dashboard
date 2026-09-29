import { useEffect, useState } from "react";

import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import LoadingSpinner from "./components/LoadingSpinner";

import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("Kolkata");
  const [searchCity, setSearchCity] = useState("Kolkata");

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");
        setWeather(null);

        if (!API_KEY) {
          throw new Error("API key is missing. Check your .env file.");
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();

          throw new Error(
            errorData.message || "Unable to fetch weather data"
          );
        }

        const data = await response.json();

        setWeather(data);
      } catch (err) {
        setWeather(null);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [searchCity]);

  const handleSearch = () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setSearchCity(city.trim());
  };

  return (
    <div className="app">
      <header>
        <h1>Weather Dashboard</h1>
        <p>Live Weather Information</p>
      </header>

      <main>
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
        />

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <p className="error">{error}</p>
        )}

        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}
      </main>

      <footer>
        <p>© 2026 Weather Dashboard</p>
      </footer>
    </div>
  );
}

export default App;