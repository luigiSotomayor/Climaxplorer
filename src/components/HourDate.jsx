import React from "react";
//import { useState, useEffect } from "react";
import { useCurrentTime } from "../hooks/useCurrentTime";
import "../styles/hourdate.css";

const HourDate = () => {
  const time = useCurrentTime();

  const formattedDate = time.toLocaleTimeString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="hourDateDisplay">
      <p>{formattedDate}</p>
    </nav>
  );
};

export default HourDate;
