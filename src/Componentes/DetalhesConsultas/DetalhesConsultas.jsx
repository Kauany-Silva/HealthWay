
import { FaCalendarAlt, FaClock, FaUserMd, FaMapMarkerAlt, FaTimes, FaFileAlt } from 'react-icons/fa';

import style from './DetalhesConsultas.module.css';

const DetalhesConsulta = ({ consulta, fechar }) => {

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    const statusFormatados = {
        agendada: 'Agendada',
        remarcada: 'Remarcada',
        realizada: 'Realizada',
        nao_compareceu: 'Não compareceu',
        cancelada: 'Cancelada',
        aguardando_atualizacao: 'Aguardando atualização'
    };

    if (!consulta) return null;

    return (
        <div className={style.overlay} onClick={fechar}>

            <section
                className={style.modal}
                onClick={(evento) => evento.stopPropagation()}
            >

                <div className={style.cabecalho}>

                    <div>
                        <span>CONSULTA</span>
                        <h2>Detalhes da consulta</h2>
                    </div>

                    <button
                        type="button"
                        className={style.fechar}
                        onClick={fechar}
                        aria-label="Fechar detalhes"
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className={style.conteudo}>

                    <div className={style.tituloConsulta}>
                        <h3>{consulta.tipo}</h3>

                        <span className={style.status}>
                            {statusFormatados[consulta.status] || consulta.status}
                        </span>
                    </div>

                    <div className={style.informacao}>
                        <FaCalendarAlt />
                        <div>
                            <span>Data</span>
                            <p>{formatarData(consulta.data)}</p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaClock />
                        <div>
                            <span>Horário</span>
                            <p>{consulta.hora?.slice(0, 5)}</p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaUserMd />
                        <div>
                            <span>Profissional</span>
                            <p>{consulta.profissional || 'Não informado'}</p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaMapMarkerAlt />
                        <div>
                            <span>Local</span>
                            <p>{consulta.local || 'Não informado'}</p>
                        </div>
                    </div>

                    <div className={style.observacoes}>
                        <FaFileAlt />

                        <div>
                            <span>Observações</span>
                            <p>
                                {consulta.observacoes || 'Nenhuma observação cadastrada.'}
                            </p>
                        </div>
                    </div>

                </div>

                <div className={style.rodape}>
                    <button
                        type="button"
                        onClick={fechar}
                    >
                        Fechar
                    </button>
                </div>

            </section>

        </div>
    );
};

export { DetalhesConsulta };
