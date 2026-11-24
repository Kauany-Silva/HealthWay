import style from './AbasMedicamentos.module.css';

const AbasMedicamentos = ({ abaAtiva, setAbaAtiva }) => {

    return (
        <nav className={style.abas}>

            <button
                type="button"
                className={abaAtiva === 'emUso' ? style.ativa : ''}
                onClick={() => setAbaAtiva('emUso')}
            >
                Em uso
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

export { AbasMedicamentos };