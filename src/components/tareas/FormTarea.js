import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectosContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  /* Extraer si un proyecto esta activo */
  const proyectos = useContext(proyectoContext);
  const { proyecto } = proyectos;
  /* Obtener la funcion del context tarea */
  const tareaContext = useContext(TareaContext);
  const {
    tareaseleccionada,
    agregarTarea,
    errortarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTareaSeleccionada,
  } = tareaContext;

  /* State para formulario de tareas*/
  const [tarea, guardarTarea] = useState({ nombre: "" });
  const { nombre } = tarea;

  /* Cambio el estad */
  useEffect(() => {
    if (tareaseleccionada !== null) {
      guardarTarea(tareaseleccionada);
    } else {
      guardarTarea({ nombre: "" });
    }
  }, [tareaseleccionada]);

  /* compruebo que exita un proyecto seleccionado */
  if (!proyecto) return null;
  /* Destructuring del proyecto porque me retorna un array de objetos */
  const [proyectoActual] = proyecto;

  const handleChange = (e) => {
    guardarTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    /* Validar  */
    if (nombre.trim() === "") return validarTarea();
    /* valdiar si es edición o una tarea nueva */
    if (!tareaseleccionada) {
      /* agregar la nueva tarea */
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
      limpiarTareaSeleccionada();
    }

    /* obtener y filtrar las tareas del proyecto actual */
    obtenerTareas(proyectoActual.id);
    /* pasar la validación */
    /* Reiniciar el form */
    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario" onSubmit={onSubmit}>
      <form>
        <div className="contenedor-input">
          <input
            tyep="text"
            className="input-text"
            placeholder="Nombre Tarea"
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={!tareaseleccionada ? "Agregar Tarea" : "Editar Tarea"}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
