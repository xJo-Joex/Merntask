import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectosContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  /* context del proyecto */
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;
  /* context de las tareas */
  const tareasContext = useContext(TareaContext);
  const {obtenerTareas} = tareasContext;

  const seleccionarProyecto = (id) => {
    proyectoActual(id);//Fijar un proyecto actual
    obtenerTareas(id);//Filtrar las tareas de un proyecto
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() =>seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
