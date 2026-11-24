
import {
    FaCalendarAlt,
    FaClock,
    FaUserMd,
    FaMapMarkerAlt,
    FaTimes,
    FaFileAlt,
    FaEdit,
    FaCheck,
    FaBan
} from 'react-icons/fa';

import style from './DetalhesConsultas.module.css';

const DetalhesConsulta = ({
    consulta,
    fechar,
    editar,
    concluir,
    cancelar
}) => {

    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    const statusFormatados = {
        agendada: 'Agendada',
        remarcada: 'Remarcada',
        realizada: 'Concluída',
        nao_compareceu: 'Não compareceu',
        cancelada: 'Cancelada',
        aguardando_atualizacao: 'Aguardando atualização'
    };

    if (!consulta) return null;

    const podeAlterar = ['agendada', 'remarcada'].includes(consulta.status);

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

                {podeAlterar && (
                    <div className={style.acoes}>
                        <button
                            type="button"
                            className={style.botaoEditar}
                            onClick={() => editar(consulta)}
                        >
                            <FaEdit />
                            Editar consulta
                        </button>

                        <button
                            type="button"
                            className={style.botaoConcluir}
                            onClick={() => concluir(consulta.id_consulta)}
                        >
                            <FaCheck />
                            Concluir
                        </button>

                        <button
                            type="button"
                            className={style.botaoCancelarConsulta}
                            onClick={() => cancelar(consulta.id_consulta)}
                        >
                            <FaBan />
                            Cancelar consulta
                        </button>
                    </div>
                )}

                <div className={style.rodape}>
                    <button type="button" onClick={fechar}>
                        Fechar
                    </button>
                </div>
            </section>
        </div>
    );
};

export { DetalhesConsulta };
