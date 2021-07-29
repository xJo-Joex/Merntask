import React, { useState, useContext,useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  /* Extraer los valores del context */
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  /* En caso de que el password o el usuario no exista */
  useEffect(() => {
    if (autenticado) {
      props.history.push("./proyectos");
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensaje, autenticado, props.history]);

  /* State para iniciar sesión */
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });
  /* Extraer de usuario */
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  /* Cuando el usuario quiere iniciar sesión */
  const onSubmit = (e) => {
    e.preventDefault();
  
    /* validar que no haya campos vacios */
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
    }

    /* Pasarlo al action */
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>
        <form  onSubmit={(e)=>onSubmit(e)}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div>
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Inicar Sesión"
             
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
