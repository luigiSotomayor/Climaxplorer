import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

//creamos el formulario para obtener los datos del usuario
const WeatherForm = ({ onSearch }) => {

  //le damos al objeto la estructura y default values que queremos
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      city: "",
      date: "",
      temperature: true,
      humidity: false,
      apparent_temperature: false,
      precipitation_probability: false,
      precipitation: false,
      surface_pressure: false,
      wind_speed: false,
      wind_direction: false,
    },
  });

  const onSubmit = async (formData) => {
    try {
      //consultamos a la API geocoding para que nos dé las coordenadas de la ciudad
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${formData.city}`
      );
      const geo = await res.json();

      //si algo falla nos sale un toast avisándonos del fallo
      if (!geo.results || geo.results.length === 0) {
        toast.error("Ciudad no encontrada", {
          position: "top-center",
          autoClose: 4000,
          theme: "colored",
        });
        return;
      }

      const { latitude, longitude } = geo.results[0];
      onSearch({ ...formData, latitude, longitude });
    } catch (err) {
      console.error("No se ha encontrado esta ciudad.", err);
    }
  };

  return (
    <form className="formWeatherForm" onSubmit={handleSubmit(onSubmit)}>
      <section className="data_text">
        <label>
          Ciudad:
          <input
            type="text"
            placeholder="Escribe una ciudad..."
            {...register("city", {
              required: {
                value: true,
                message: "❌ Este campo es requerido ❌",
              },
            })}
          />
        </label>
        {formState.errors.city ? (
          <p className="errorMessage">{formState.errors.city.message}</p>
        ) : null}
        <br />

        <label>
          Fecha:
          <input
            type="date"
            {...register("date", {
              required: {
                value: true,
                message: "❌ Este campo es requerido ❌",
              },
            })}
          />
        </label>
        {formState.errors.date ? (
          <p className="errorMessage">{formState.errors.date.message}</p>
        ) : null}
      </section>

      <br />

      <fieldset className="fieldCheckBox">
        <legend>Variables climáticas:</legend>
        <label>
          <input type="checkbox" {...register("temperature")} />
          Temperatura
        </label>
        <label>
          <input type="checkbox" {...register("apparent_temperature")} />
          Sensación térmica
        </label>
        <label>
          <input type="checkbox" {...register("humidity")} />
          Humedad
        </label>
        <label>
          <input type="checkbox" {...register("precipitation_probability")} />
          Probabilidad de precipitación
        </label>
        <label>
          <input type="checkbox" {...register("precipitation")} />
          Precipitación
        </label>
        <label>
          <input type="checkbox" {...register("surface_pressure")} />
          Presión atmosférica
        </label>
        <label>
          <input type="checkbox" {...register("wind_speed")} />
          Velocidad del viento
        </label>
        <label>
          <input type="checkbox" {...register("wind_direction")} />
          Dirección del viento
        </label>
      </fieldset>

      <br />

      <button
        className="btn_consultar"
        type="submit"
        disabled={!formState.isDirty}
      >
        Consultar
      </button>
    </form>
  );
};

export default WeatherForm;
