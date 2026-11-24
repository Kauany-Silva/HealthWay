import {
    FaPills,
    FaCalendarAlt,
    FaClock,
    FaFileAlt,
    FaTimes,
    FaEdit,
    FaTrash
} from 'react-icons/fa';

import style from './DetalhesMedicamentos.module.css';

const DetalhesMedicamento = ({
    medicamento,
    fechar,
    editar,
    excluir
}) => {

    const diasSemana = {
        domingo: 'Domingo',
        segunda: 'Segunda-feira',
        terca: 'Terça-feira',
        quarta: 'Quarta-feira',
        quinta: 'Quinta-feira',
        sexta: 'Sexta-feira',
        sabado: 'Sábado'
    };

    const statusFormatados = {
        ativo: 'Em uso',
        concluido: 'Concluído',
        interrompido: 'Interrompido'
    };

    if (!medicamento) return null;

    const diasFormatados = (medicamento.dias || [])
        .map(dia => diasSemana[dia] || dia);

    const podeAlterar = medicamento.status === 'ativo';

    return (
        <div className={style.overlay} onClick={fechar}>
            <section
                className={style.modal}
                onClick={(evento) => evento.stopPropagation()}
            >
                <div className={style.cabecalho}>
                    <div>
                        <span>MEDICAMENTO</span>
                        <h2>Detalhes do medicamento</h2>
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
                    <div className={style.tituloMedicamento}>
                        <h3>{medicamento.nome}</h3>

                        <span className={style.status}>
                            {statusFormatados[medicamento.status] || medicamento.status}
                        </span>
                    </div>

                    <div className={style.informacao}>
                        <FaFileAlt />
                        <div>
                            <span>Finalidade</span>
                            <p>
                                {medicamento.finalidade || 'Não informada'}
                            </p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaCalendarAlt />
                        <div>
                            <span>Dias de utilização</span>
                            <p>
                                {diasFormatados.length > 0
                                    ? diasFormatados.join(', ')
                                    : 'Não informado'}
                            </p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaClock />
                        <div>
                            <span>Horários</span>
                            <p>
                                {medicamento.horarios?.length > 0
                                    ? medicamento.horarios.join(' • ')
                                    : 'Nenhum horário cadastrado'}
                            </p>
                        </div>
                    </div>

                    <div className={style.informacao}>
                        <FaPills />
                        <div>
                            <span>Quantidade de horários por dia</span>
                            <p>
                                {medicamento.horarios?.length || 0}
                                {' '}
                                {(medicamento.horarios?.length || 0) === 1
                                    ? 'horário'
                                    : 'horários'}
                            </p>
                        </div>
                    </div>
                </div>

                {podeAlterar && (
                    <div className={style.acoes}>
                        <button
                            type="button"
                            className={style.botaoEditar}
                            onClick={() => editar(medicamento)}
                        >
                            <FaEdit />
                            Editar medicamento
                        </button>

                        <button
                            type="button"
                            className={style.botaoExcluir}
                            onClick={() => excluir(medicamento.id_medicamento)}
                        >
                            <FaTrash />
                            Excluir medicamento
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

export { DetalhesMedicamento };