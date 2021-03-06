import React, { useReducer } from "react";
import {
  REGISTRO_EXISTOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
  OBTENER_USUARIO,
} from "../../types";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  /* Retorna el usuario autenticado*/
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      /* TODO: Funcion para enviar el token por headers */
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios.get("./api/auth");
      // console.log(respuesta);
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      // console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  //Las funciones
  const registrarUsuarios = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios", datos);
      // console.log(respuesta.data);
      dispatch({ type: REGISTRO_EXISTOSO, payload: respuesta.data });
      /* Obtener el usuario */
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response);
      // console.log(error.response.data.msg);
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  /* Cuando el usuario inicia sesión */
  const iniciarSesion = async (datos) => {
    // console.log(datos);
    try {
      const respuesta = await clienteAxios.post("/api/auth", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      usuarioAutenticado();
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error",
      };
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta,
      });
    }
  };
  /* Cierra la sesión del usuario */
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuarios,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
