import { Line } from "react-chartjs-2";
import { useState, useContext } from "react";
import { dataContext } from "../pages/Search";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

//Crea los gráficos de la humedad y la presión cuando son necesarios
const Graph = ({ meteoParam }) => {
  const { data, query } = useContext(dataContext) || {}; //coge los datos tomados de la API a través del context
  const [metParam, setMetParam] = useState(meteoParam); //Incluye la humedad y/o la presión según quiera el usuario

  //creamos un objeto con los valores formateados de fecha para ponerlos en el eje del gráfico
  const labels = data?.hourly?.time.slice(0, 24).map((t) => {
    const hora = new Date(t).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return hora;
  });

    //configuramos los datos a representar en el gráfico
  const datasets = [];

  //si el usuario a elegido la humedad relativa
  if (metParam.includes("humidity")) {
    datasets.push({
      label: "Humedad relativa (%)",
      data: data.hourly.relative_humidity_2m.slice(0, 24),
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.3)",
      tension: 0.3,
      pointRadius: 3,
      fill: true,
      yAxisID: "y1",
    });
  }

  //si el usuario ha elegido la presión atmosférica
  if (metParam.includes("pressure")) {
    datasets.push({
      label: "Presión atmosférica (hPa)",
      data: data.hourly.surface_pressure.slice(0, 24),
      borderColor: "rgba(245, 7, 7, 1)",
      backgroundColor: "rgba(245, 7, 7, 0.3)",
      tension: 0.3,
      pointRadius: 3,
      fill: true,
      yAxisID: "y2",
    });
  }

  //objeto que almacena la información de los ejes y datos a representar
  const chartData = {
    labels,
    datasets,
  };

  //configuramos las diferentes opciones del gráfico
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: false,
        ticks: {
          callback: (value) => `${value} %`,
        },
      },
      y2: {
        type: "linear",
        position: "right",
        min: 900,
        max: 1080,
        beginAtZero: false,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: (value) => `${value} hPa`,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className="graph">
      {datasets.length === 0 ? (
        <p></p>
      ) : (
        <>
          <h3 className="graphTitle">Evolución en las 24 horas</h3>
          <Line data={chartData} options={options} />
        </>
      )}
    </div>
  );
};

export default Graph;
