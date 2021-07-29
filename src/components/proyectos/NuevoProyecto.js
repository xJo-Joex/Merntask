import React, { useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectosContext";

const NuevoProyecto = () => {
  /* obtener el state del formulario */
  const proyectosContext = useContext(proyectoContext);

  const {
    formulario,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectosContext;
  /* State para proyecto */
  const [proyecto, guardarProyecto] = useState({
    nombre: "",
  });
  const { nombre } = proyecto;
  /* lee los contenidos del input */
  const onChangeProyecto = (e) => {
    guardarProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };
  /* cuando el usuario envia un proyecto */
  const onSubmitProyecto = (e) => {
    // console.log(e);
    e.preventDefault();

    /* validar el proyecto */
    if (nombre === "") {
      mostrarError();
      return;
    }

    /* Agregar al state */
    agregarProyecto(proyecto);

    /* Reiniciar el form */
    guardarProyecto({ nombre: "" });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => mostrarFormulario()}
        className="btn btn-block btn-primario"
      >
        Nuevo Proyecto
      </button>
      {formulario && (
        <form className="formulario-nuevo-proyecto">
          <input
            type="text"
            className="input-text"
            placeholder="Nuevo Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
            onClick={(event) => onSubmitProyecto(event)}
          />
        </form>
      )}
      {errorformulario && (
        <p className="mensaje error">El nombre del proyecto es obligatorio</p>
      )}
    </>
  );
};

export default NuevoProyecto;
