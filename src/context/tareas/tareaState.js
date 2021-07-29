import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";
import {
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  TAREAS_PROYECTO,
  VALIDAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA,
} from "../../types";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  /* Crear dispatch y state */
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  /* Crear las funciones */
  const obtenerTareas = async (proyecto) => {
    try {
      const resultado = await clienteAxios.get("api/tareas", {
        params: { proyecto: proyecto },
      });
      dispatch({
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* Agregar una tarea al proyecto seleccionado */
  const agregarTarea = async (tarea) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const resultado = await clienteAxios.post("/api/tareas/", tarea);
      dispatch({
        type: AGREGAR_TAREA,
        payload: tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* validar tarea */
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };
  /* Eliminar tareas */
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, {
        params: { proyecto: proyecto },
      });
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* cambiar estado tarea */
  /* const actualizar tarea */
  const actualizarTarea = async (tarea) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/tareas/${tarea._id}`,
        tarea
      );
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tarea,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /* Selecionar una tarea */
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  /* limpiar tarea */
  const limpiarTareaSeleccionada = () => {
    dispatch({
      type: LIMPIAR_TAREA,
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTareaSeleccionada,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
