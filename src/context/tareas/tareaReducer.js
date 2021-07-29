import {
  ACTUALIZAR_TAREA,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  LIMPIAR_TAREA,
  TAREAS_PROYECTO,
  TAREA_ACTUAL,
  VALIDAR_TAREA,
} from "../../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {
        ...state,
        tareasproyecto: action.payload,
      };
    case AGREGAR_TAREA:
      return {
        ...state,
        tareasproyecto: [...state.tareasproyecto, action.payload],
        errortarea: false,
      };
    case VALIDAR_TAREA:
      return {
        ...state,
        errortarea: true,
      };
    case ELIMINAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareasproyecto: state.tareasproyecto.map((tarea) =>
          tarea._id === action.payload._id ? action.payload : tarea
        ),
      };
    case TAREA_ACTUAL:
      return {
        ...state,
        tareaseleccionada: action.payload,
      };
    case LIMPIAR_TAREA:
      return {
        ...state,
        tareaseleccionada: null,
      };
    default:
      return state;
  }
};
