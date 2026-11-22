
import { FaPlus } from 'react-icons/fa';

import style from './CabecalhoConsultas.module.css';

const CabecalhoConsultas = ({ abrirModal }) => {

    return (
        <header className={style.cabecalho}>

            <div className={style.textos}>

                <h1>Minhas Consultas</h1>

                <p>
                    Organize seus compromissos e acompanhe seus atendimentos.
                </p>
            </div>

            <button
                className={style.botao}
                onClick={abrirModal}
            >
                <FaPlus />
                Nova consulta
            </button>

        </header>
    );
};

export { CabecalhoConsultas };
