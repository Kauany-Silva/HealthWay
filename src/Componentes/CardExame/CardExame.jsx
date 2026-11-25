
import { FaFileMedical, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';

import style from './CardExame.module.css';

const CardExame = ({ exame, selecionarExame }) => {

    const formatarData = (data) => {
        if (!data) return 'Data não informada';

        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    return (
        <article className={style.card}>

            <div className={style.icone}>
                <FaFileMedical />
            </div>

            <div className={style.informacoes}>
                <h3>{exame.nome_exame || 'Exame laboratorial'}</h3>

                <p>
                    <FaCalendarAlt />
                    {formatarData(exame.data_exame)}
                </p>
            </div>

            <button
                className={style.botaoDetalhes}
                onClick={selecionarExame}
            >
                Ver detalhes
                <FaChevronRight />
            </button>

        </article>
    );
};

export { CardExame };
