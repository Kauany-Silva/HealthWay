import { AcessoRapido, MenuLateral, Destaques } from "../../Componentes";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Logo from "../../Assets/Imagens/Logo.png";
import style from "./Dashboard.module.css";

const Dashboard = () => {
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  const estaNaCarteira = location.pathname === "/dashboard/vacinacao";

  return (
    <div className={style.Dashboard}>
      <MenuLateral />

      {estaNaCarteira ? (
        <Outlet />
      ) : (
        <>
          <div className={style.boasVindas}>
            <div className={style.logo}>
              <img src={Logo} alt="Logo Health Way" />
            </div>

            <h1>
              Bem-vindo, {usuario?.usu_nome}
            </h1>
          </div>

          <Destaques />
          <AcessoRapido />
        </>
      )}
    </div>
  );
};

export { Dashboard };