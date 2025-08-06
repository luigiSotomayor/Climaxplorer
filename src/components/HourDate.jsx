import React from "react";
import { useState, useEffect } from "react";
import "../styles/hourdate.css";

const HourDate = () => {
  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setFechaHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fechaFormateada = fechaHora.toLocaleTimeString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="hourDateDisplay">
      <p>{fechaFormateada}</p>
    </nav>
  );
};

export default HourDate;
