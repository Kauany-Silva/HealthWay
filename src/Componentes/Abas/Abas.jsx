
import style from './Abas.module.css';

const Abas = ({ abaAtiva, setAbaAtiva }) => {

    return (
        <nav className={style.abas}>

            <button
                type="button"
                className={abaAtiva === 'agendadas' ? style.ativa : ''}
                onClick={() => setAbaAtiva('agendadas')}
            >
                Agendadas
            </button>

            <button
                type="button"
                className={abaAtiva === 'historico' ? style.ativa : ''}
                onClick={() => setAbaAtiva('historico')}
            >
                Histórico
            </button>

        </nav>
    );
};

export { Abas };
