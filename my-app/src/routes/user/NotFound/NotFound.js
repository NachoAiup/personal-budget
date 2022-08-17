import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Pagina no encontrada</h2>
      <Link to="/">Ir al Inicio</Link>
    </div>
  );
};

export default NotFound;
