import { useContext } from 'react'
import '../styles/detail.css'
import WeatherCard from '../components/WeatherCard'

import { dataContext } from './Search';
import Graph from '../components/Graph';

const Detail = () => {
  const { data = {}, query = {} } = useContext(dataContext) || {};//cogemos los datos por el context

  const meteoParam = [];
    //añadimos a meteoParam si el usuario ha elegido humedad y/o presión
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