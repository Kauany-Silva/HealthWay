
import { AcessoRapido, MenuLateral, Destaques } from "../../Componentes";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Logo from "../../Assets/Imagens/Logo.png";
import style from "./Dashboard.module.css";

const Dashboard = () => {

    const usuario = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    const primeiroNome = usuario?.nome_completo
        ?.trim()
        .split(/\s+/)[0];

    const location = useLocation();

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    const estaNoDashboard = location.pathname === "/dashboard";

    return (
        <div className={style.Dashboard}>

            <MenuLateral />

            {estaNoDashboard ? (
                <>
                    <div className={style.boasVindas}>
                        <div className={style.logo}>
                            <img src={Logo} alt="Logo Health Way" />
                        </div>

                        <h1>
                            Bem-vindo, {primeiroNome}!
                        </h1>
                    </div>

                    <Destaques />
                    <AcessoRapido />
                </>
            ) : (
                <Outlet />
            )}

        </div>
    );
};

export { Dashboard };