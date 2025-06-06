import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "YOUR_OPENWEATHER_API_KEY";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      setError("City not found");
      setWeather(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="border p-2 w-full"
      />
      <button
        onClick={getWeather}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Get Weather
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {weather && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
