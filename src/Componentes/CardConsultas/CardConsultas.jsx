
import { FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt } from 'react-icons/fa';
import style from './CardConsultas.module.css';

const CardConsulta = ({ consulta, abrirDetalhes }) => {

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    const formatarStatus = (status) => {
        const statusFormatados = {
            agendada: 'Agendada',
            remarcada: 'Remarcada',
            realizada: 'Realizada',
            nao_compareceu: 'Não compareceu',
            cancelada: 'Cancelada',
            aguardando_atualizacao: 'Aguardando atualização'
        };

        return statusFormatados[status] || status;
    };

    return (
        <article className={style.card}>

            <div className={style.conteudo}>

                <div className={style.topo}>
                    <h3>{consulta.tipo}</h3>

                    <span className={`${style.status} ${style[consulta.status]}`}>
                        {formatarStatus(consulta.status)}
                    </span>
                </div>

                <div className={style.informacoes}>

                    <p>
                        <FaCalendarAlt />
                        {formatarData(consulta.data)}
                    </p>

                    <p>
                        <FaClock />
                        {consulta.hora?.slice(0, 5)}
                    </p>

                    <p>
                        <FaUserMd />
                        {consulta.profissional}
                    </p>

                    {consulta.local && (
                        <p>
                            <FaMapMarkerAlt />
                            {consulta.local}
                        </p>
                    )}

                </div>

            </div>

            <button
                type="button"
                className={style.botaoDetalhes}
                onClick={() => abrirDetalhes(consulta)}
            >
                Ver detalhes
            </button>

        </article>
    );
};

export { CardConsulta };
