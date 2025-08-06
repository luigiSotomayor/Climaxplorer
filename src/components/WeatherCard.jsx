import React from "react";
import { mean } from "mathjs";
import "../styles/weathercard.css";

import CityIcon from '../assets/icons/edificio.png';
import DateIcon from '../assets/icons/fecha.png';
import SunsetIcon from '../assets/icons/atardecer.png';
import SunriseIcon from '../assets/icons/amanecer.png';
import LatitudeIcon from '../assets/icons/latitud.png';
import LongitudeIcon from '../assets/icons/longitud.png';
import TMaxIcon from '../assets/icons/temperature_max.png';
import TMinIcon from '../assets/icons/frio.png';
import ApTMaxIcon from '../assets/icons/calor.png';
import ApTMinIcon from '../assets/icons/app_temp_min.png';
import VolPrecipitacionIcon from '../assets/icons/vol_precipitation.png';
import PrecProbIcon from '../assets/icons/precipitation_probability.png';
import WindDirectionIcon from '../assets/icons/wind_direction.png';
import WindSpeedIcon from '../assets/icons/wind_speed.png';
import HumidityIcon from '../assets/icons/humidity.png';
import PressureIcon from '../assets/icons/barometro.png';


const WeatherCard = ({ data, query }) => {
  const sunrise = new Date(data.daily.sunrise).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const sunset = new Date(data.daily.sunset).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const date = new Date(query.date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="weatherCard">
      <section className="alwaysVisible">
        <p className="info"><img src={CityIcon} alt="Ciudad" title="Ciudad"/><span>{query.city}</span></p>
        <p className="info"><img src={SunriseIcon} alt="Salida del sol" title="Salida del sol"/><span>{sunrise} h</span></p>
        <p className="info"><img src={LatitudeIcon} alt="Latitud" title="Latitud"/><span>{data.latitude}º</span></p>
        <p className="info"><img src={DateIcon} alt="Fecha" title="Fecha"/><span>{date}</span></p>
        <p className="info"><img src={SunsetIcon} alt="Puesta del sol" title="Puesta del sol"/><span>{sunset} h</span></p>
        <p className="info"><img src={LongitudeIcon} alt="Longitud" title="Longitud"/><span>{data.longitude}º</span></p>
      </section>
      <section className="visibleParams">
        {query.temperature ? (
          <>
            <p className="info"><img src={TMaxIcon} alt="Temperatura máxima" title="Temperatura máxima"/><span>{data.daily.temperature_2m_max}ºC</span></p>
            <p className="info"><img src={TMinIcon} alt="Temperatura mínima" title="Temperatura mínima"/><span>{data.daily.temperature_2m_min}ºC</span></p>
          </>
        ) : null}
        {query.apparent_temperature ? (
          <>
            <p className="info">
              <img src={ApTMaxIcon} alt="Sensación térmica máxima" title="Sensación térmica máxima"/><span>{data.daily.apparent_temperature_max}ºC</span>
            </p>
            <p className="info">
              <img src={ApTMinIcon} alt="Sensación térmica mínima" title="Sensación térmica mínima"/><span>{data.daily.apparent_temperature_min}ºC</span>
            </p>
          </>
        ) : null}
        {query.precipitation ? (
          <>
            <p className="info"><img src={VolPrecipitacionIcon} alt="Volumen de precipitación" title="Volumen de precipitación"/><span>{data.daily.precipitation_sum} mm</span></p>
          </>
        ) : null}
        {query.precipitation_probability ? (
          <p className="info">
            <img src={PrecProbIcon} alt="Probabilidad de precipitación" title="Probabilidad de precipitación"/><span>{data.daily.precipitation_probability_max}%</span>
          </p>
        ) : null}
        {query.wind_direction ? (
          <p className="info">
            <img src={WindDirectionIcon} alt="Dirección del viento" title="Dirección del viento"/><span>{data.daily.wind_direction_10m_dominant}º</span>
          </p>
        ) : null}
        {query.wind_speed ? (
          <p className="info"><img src={WindSpeedIcon} alt="Velocidad del viento" title="Velocidad del viento"/><span>{data.daily.wind_speed_10m_max} km/h</span></p>
        ) : null}
        {query.humidity ? (
          <p className="info"><img src={HumidityIcon} alt="Humedad relativa media" title="Humedad relativa media"/><span>{Math.round(mean(data.hourly.relative_humidity_2m)*10)/10}%</span></p>
        ) : null}
        {query.surface_pressure ? (
          <p className="info"><img src={PressureIcon} alt="Presión atmosférica media" title="Presión atmosférica media"/><span>{Math.round(mean(data.hourly.surface_pressure)*10)/10} hPa</span></p>
        ) : null}
      </section>
    </div>
  );
};

export default WeatherCard;
