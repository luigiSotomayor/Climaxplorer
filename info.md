Proyecto ClimaXplorer

react-router-dom para navegación

react-hook-form para el formulario

useEffect para fetch

API: Open-Meteo + geocoding

📦 1. Instalación inicial

npm create vite@latest climaxplorer --template react
cd climaxplorer
npm install react-router-dom react-hook-form

🧱 Estructura de archivos

src/
├── App.jsx
├── main.jsx
├── pages/
│   ├── Home.jsx
│   ├── Search.jsx
│   └── Detail.jsx
├── components/
│   ├── WeatherForm.jsx
│   └── WeatherCard.jsx

📘 main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

📘 App.jsx

import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Detail from './pages/Detail';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/buscar">Buscar clima</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buscar" element={<Search />} />
        <Route path="/detalle/:lat/:lon" element={<Detail />} />
      </Routes>
    </div>
  );
}

📘 pages/Home.jsx

export default function Home() {
  return (
    <div>
      <h1>ClimaXplorer 🌤️</h1>
      <p>Consulta el clima por ciudad, rango de días y datos específicos.</p>
    </div>
  );
}

📘 components/WeatherForm.jsx

import { useForm } from 'react-hook-form';

export default function WeatherForm({ onSearch }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${data.city}`);
    const geo = await res.json();
    const { latitude, longitude } = geo.results[0];
    onSearch({ ...data, latitude, longitude });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Ciudad:</label>
      <input {...register('city', { required: true })} />

      <label>Días (1 a 7):</label>
      <input type="number" {...register('days')} defaultValue={3} min={1} max={7} />

      <label>Mostrar:</label>
      <div>
        <label><input type="checkbox" {...register('temperature')} /> Temperatura</label>
        <label><input type="checkbox" {...register('precipitation')} /> Precipitaciones</label>
        <label><input type="checkbox" {...register('wind')} /> Viento</label>
      </div>

      <button type="submit">Buscar clima</button>
    </form>
  );
}

📘 components/WeatherCard.jsx

export default function WeatherCard({ day, index }) {
  return (
    <div>
      <h4>Día {index + 1}</h4>
      <p>Temp Max: {day.temperature_2m_max}°C</p>
      <p>Temp Min: {day.temperature_2m_min}°C</p>
      <p>Precipitaciones: {day.precipitation_sum}mm</p>
    </div>
  );
}

📘 pages/Search.jsx

import { useState, useEffect } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';

export default function Search() {
  const [query, setQuery] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchWeather = async () => {
      setLoading(true);
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${query.latitude}&longitude=${query.longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FMadrid`;
        const res = await fetch(url);
        const json = await res.json();
        setData(json.daily);
        setError(null);
      } catch (err) {
        setError('Error al obtener el clima.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [query]);

  return (
    <div>
      <h2>Buscar clima</h2>
      <WeatherForm onSearch={setQuery} />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {data && data.time.map((_, i) => (
        <WeatherCard
          key={i}
          day={{
            temperature_2m_max: data.temperature_2m_max[i],
            temperature_2m_min: data.temperature_2m_min[i],
            precipitation_sum: data.precipitation_sum[i],
          }}
          index={i}
        />
      ))}
    </div>
  );
}

📘 pages/Detail.jsx

import { useParams } from 'react-router-dom';

export default function Detail() {
  const { lat, lon } = useParams();
  return (
    <div>
      <h2>Detalle climático</h2>
      <p>Latitud: {lat}</p>
      <p>Longitud: {lon}</p>
      <p>(Aquí podrías ampliar con gráficos, más detalles, etc.)</p>
    </div>
  );
}
