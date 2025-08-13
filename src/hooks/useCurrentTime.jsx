import { useState, useEffect } from "react";

export const useCurrentTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer); // limpiar el interval al desmontar
  }, []);

  return time;
};