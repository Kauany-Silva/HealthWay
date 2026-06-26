import {
  FaCalendar,
  FaHospital,
  FaSyringe
} from "react-icons/fa6";

import { useNavigate } from "react-router-dom";

import style from "./AcessoRapido.module.css";

const AcessoRapido = () => {

  const navigate = useNavigate();

  return (
   <section className={style.container}>

    <h2>Acesso Rápido</h2>

    <div className={style.cartoes}>

        <div
            className={style.cartao}
            onClick={() => navigate("/vacinacao")}
        >

            <div className={style.icone}>
                <FaSyringe />
            </div>

            <div className={style.info}>
                <h3>Ver Vacinas</h3>
                <p>Consulte sua carteira de vacinação.</p>
            </div>

        </div>

        <div
            className={style.cartao}
            onClick={() => navigate("/consultas")}
        >

            <div className={style.icone}>
                <FaCalendar />
            </div>

            <div className={style.info}>
                <h3>Consultas</h3>
                <p>Veja seus próximos agendamentos.</p>
            </div>

        </div>

        <div
            className={style.cartao}
            onClick={() => navigate("/hospitais")}
        >

            <div className={style.icone}>
                <FaHospital />
            </div>

            <div className={style.info}>
                <h3>Hospitais</h3>
                <p>Encontre hospitais próximos.</p>
            </div>

        </div>

    </div>

</section>
  );
};

export { AcessoRapido };