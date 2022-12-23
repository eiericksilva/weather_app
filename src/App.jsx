import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=176d3f48f92343e7aa6184335222112&q=${city}&lang=pt`
      )
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          setWeatherForecast(data);
          console.log(weatherForecast);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container">
      <form>
        <input placeholder="City" value={city} onChange={handleChange} />
        <button type="submit" onClick={handleSearch}>
          Pesquise
        </button>
      </form>
      {weatherForecast && (
        <div className="ContainerData">
          <div className="headerData">
            <div className="location">
              <h1>{weatherForecast.location.name}</h1>
              <h3>{weatherForecast.location.region}</h3>
            </div>
            <div>{weatherForecast.current.last_updated}</div>
            <div>{weatherForecast.current.condition.text}</div>
          </div>
          <h1 id="current_temp">{weatherForecast.current.temp_c}ºC</h1>
          <div>Umidade: {weatherForecast.current.humidity}%</div>
        </div>
      )}
    </div>
  );
}

export default App;
