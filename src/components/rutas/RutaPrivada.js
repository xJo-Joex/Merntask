import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/authContext";

const RutaPrivada = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { autenticado, usuarioAutenticado, cargando } = authContext;

  useEffect(() => {
    usuarioAutenticado();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //   console.log(props);
  //   console.log(Component);
  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !cargando  ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
