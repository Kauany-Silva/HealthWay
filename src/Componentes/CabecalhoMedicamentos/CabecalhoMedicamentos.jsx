
import { FaPlus } from 'react-icons/fa';

import style from './CabecalhoMedicamentos.module.css';

const CabecalhoMedicamentos = ({ abrirModal }) => {

    return (
        <header className={style.cabecalho}>

            <div className={style.textos}>

                <h1>Meus Medicamentos</h1>

                <p>
                    Organize seus medicamentos e acompanhe seus horários.
                </p>

            </div>

            <button
                className={style.botao}
                onClick={abrirModal}
            >
                <FaPlus />
                Novo medicamento
            </button>

        </header>
    );
};

export { CabecalhoMedicamentos };
