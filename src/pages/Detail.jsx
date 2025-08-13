import React, { useContext } from 'react'
import '../styles/detail.css'
import WeatherCard from '../components/WeatherCard'

import { dataContext } from './Search';
//import { useLocation } from 'react-router-dom'
import Graph from '../components/Graph';

const Detail = () => {

  //TODO en la siguiente línea hay que cambiar useLocation() por useContext(dataContext);
  const { data = {}, query = {} } = useContext(dataContext) || {};

  const meteoParam = [];

    if (query?.humidity) meteoParam.push('humidity');
    if (query?.surface_pressure) meteoParam.push('pressure');

  return (
    <div className='MainDetail'>
      <p>La información meteorológica solicitada es:</p>
      <WeatherCard />
      <Graph meteoParam={meteoParam}/>
    </div>
  )
}

export default Detail