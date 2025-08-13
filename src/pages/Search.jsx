import React, { createContext, useState, useEffect } from "react";
import WeatherForm from "../components/WeatherForm";
import Detail from "./Detail";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";

export const dataContext = createContext();

const Search = () => {
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;
    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${query.latitude}&longitude=${query.longitude}&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&hourly=relative_humidity_2m,surface_pressure&start_date=${query.date}&end_date=${query.date}&timezone=auto`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setError(null);

      } catch (err) {
        setError("Error al obtener los datos climáticos.");
        console.log(error);
      }
    };
    fetchWeather();
  }, [query]);

  return (
    <main className="mainSearch">
      <section className="sectionWeatherForm">
        {!data ? (
          <>
            <p className="explainSearch">
              Rellene el siguiente formulario sobre la ciudad y fecha sobre la
              que quiere recibir información climática. Además, debe elegir las
              variables climáticas de las cuales quiere conocer la información.
              Todos los campos son requeridos.
            </p>
            <section className="sectionWeatherForm">
              <WeatherForm onSearch={setQuery} />
            </section>
          </>
        ) : (
          <dataContext.Provider value={{ data, query }}>
            <Detail />
          </dataContext.Provider>
        )}
      </section>
    </main>
  );
};

export default Search;
