import { MenuLateral } from "../../Componentes"
import { Navigate } from 'react-router-dom';

import Logo from "../../Assets/Imagens/Logo.png"

import style from "./Dashboard.module.css"


const Dashboard= () => {

    const usuario = JSON.parse(
    localStorage.getItem('usuario')
  );

  if (!usuario) {
    return <Navigate to="/login" />;
  }

    return (
        <>
        <div className={style.Dashboard}>

            <MenuLateral/>
        
        <div className={style.boasVindas}>

        <div className={style.logo}>
            <img src={Logo} alt="Logo Health Way" />
        </div>
                  
        <h1> 
        Bem Vindo, {usuario?.usu_nome}
        </h1>

        </div>
        </div>
        </>
    )
    
}

export {Dashboard}