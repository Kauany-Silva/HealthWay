import { FaPlus } from 'react-icons/fa';
import style from './CabecalhoExames.module.css';

const CabecalhoExames = ({ abrirModal }) => {

    return (
        <header className={style.cabecalho}>

            <div className={style.informacoes}>
                <h1>Meus Exames</h1>
                <p>
                    Acompanhe seus resultados laboratoriais e
                    observe a evolução dos seus indicadores.
                </p>
            </div>

            <button
                className={style.botaoAdicionar}
                onClick={abrirModal}
            >
                <FaPlus />
                Adicionar Exame
            </button>

        </header>
    );
};

export { CabecalhoExames };
