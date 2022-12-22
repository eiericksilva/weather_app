import { useState } from "react";

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
        <input value={city} onChange={handleChange} />
        <button type="submit" onClick={handleSearch}>
          Pesquise
        </button>
      </form>
      {weatherForecast && (
        <>
          <div>Condição do tempo:{weatherForecast.current.condition.text}</div>
          <div>Umidade:{weatherForecast.current.humidity}</div>
          <div>{weatherForecast.current.is_day ? "Dia" : "Noite"}</div>
          <div>{weatherForecast.current.temp_c}ºC</div>
          <span>{weatherForecast.location.name}</span>
          <span>{weatherForecast.location.region}</span>
          <span>{weatherForecast.location.country}</span>
        </>
      )}
    </div>
  );
}

export default App;
