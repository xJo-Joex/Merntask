import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  /* Extraer los valores del context */
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, registrarUsuarios } = authContext;

  /* En caso de que el usuario se haya autenticado o registrado o sea un registro */
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
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  /* Extraer de usuario */
  const { nombre, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  /* Cuando el usuario quiere iniciar sesión */
  const onSubmit = (e) => {
    e.preventDefault();
    /* validar que no haya campos vacios */
    if (
      nombre.trim() === "" ||
      email.trim === "" ||
      password.trim === "" ||
      confirmar.trim === ""
    ) {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }



    /* password minimo 6 caracteres */
    if (password.length < 6) {
      mostrarAlerta(
        "Password debe ser de al menos de 6 caracteres",
        "alerta-error"
      );
      return;
    }
    /* Los 2 password son iguales */
    if (password !== confirmar) {
      mostrarAlerta("Los password deben ser iguales", "alerta-error");
      return;
    }

    /* Pasarlo al action */
    registrarUsuarios({ nombre, email, password });
  };

  return (
    <div className="form-usuario" onSubmit={onSubmit}>
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}
      <div className="contenedor-form sombra-dark">
        <h1>Registrate</h1>
        <form>
          <div className="campo-form">
            <label htmlFor="email">Nombres: </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              onChange={onChange}
              value={nombre}
            />
          </div>
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
          <div className="campo-form">
            <label htmlFor="confirmar">password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu password"
              onChange={onChange}
              value={confirmar}
            />
          </div>
          <div>
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrar"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Inciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
