import "../styles/home.css";
import { useNavigate } from "react-router-dom";

//crea la página de inicio
const Home = () => {
  const navigate = useNavigate();

  const goToSearch = () => {
    navigate("/buscar");
  };

  return (
    <div className="mainHomePage">
      <section className="blockTextButton">
        <section className="mainHomeText">
          <p>
            Conocer las condiciones climáticas de un lugar antes de visitarlo es
            fundamental, especialmente si se trata de un viaje planificado o una
            actividad al aire libre. Las variables como la temperatura, la
            humedad, el viento o la probabilidad de precipitaciones pueden
            influir directamente en la experiencia, la seguridad y las
            decisiones que tomamos. Tener acceso a esta información con
            antelación nos permite prepararnos adecuadamente y evitar
            imprevistos.
          </p>
          <p>
            Con este objetivo en mente, esta aplicación web ha sido diseñada
            para facilitar el acceso a datos climáticos específicos de cualquier
            lugar y fecha que el usuario desee consultar. De forma rápida y
            clara, la app proporciona información relevante sobre las
            condiciones meteorológicas, con el fin de ayudar a planificar mejor
            cada desplazamiento o actividad. La herramienta está pensada para
            ofrecer una experiencia sencilla pero útil, tanto para usuarios
            ocasionales como para quienes necesitan datos más precisos.
          </p>
          <p>
            El funcionamiento de la página es muy intuitivo: al pulsar el botón
            "Continuar", el usuario será dirigido a un formulario donde deberá
            completar los campos requeridos (como la ubicación y la fecha de
            interés). Una vez completado y enviado el formulario, la aplicación
            procesará los datos ingresados y devolverá la información
            meteorológica correspondiente. De este modo, el usuario podrá
            conocer las variables climáticas del lugar seleccionado de forma
            rápida y efectiva.
          </p>
        </section>
        <section className="mainButton">
          <button onClick={goToSearch} className="btn_continue">
            Continuar
          </button>
        </section>
      </section>
      <section className="mainHomeImage">
        <img
          src="/images/img_mapa_isobárico.jpg"
          alt="Mapa isobárico"
        />
      </section>
    </div>
  );
};

export default Home;
