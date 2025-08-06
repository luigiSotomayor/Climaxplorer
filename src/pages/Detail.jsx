import React from 'react'
import '../styles/detail.css'
import WeatherCard from '../components/WeatherCard'

import { useLocation } from 'react-router-dom'
import Graph from '../components/Graph';

const Detail = () => {

  const { state } = useLocation();
  const { data, query } = state || {};

  const meteoParam = [];

  query.humidity ? meteoParam.push('humidity'): null;
  query.surface_pressure ? meteoParam.push('pressure'): null;

  return (
    <div className='MainDetail'>
      <p>La información meteorológica solicitada es:</p>
      <WeatherCard data={data} query={query}/>
      <Graph hourly={data.hourly} meteoParam={meteoParam}/>
    </div>
  )
}

export default Detail