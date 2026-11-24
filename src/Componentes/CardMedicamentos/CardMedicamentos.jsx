import {
    FaCalendarAlt,
    FaClock,
    FaPills,
    FaClipboardList,
    FaEdit,
    FaTrash
} from 'react-icons/fa';

import style from './CardMedicamentos.module.css';

const CardMedicamentos = ({
    medicamento,
    abrirDetalhes,
    editar,
    excluir
}) => {

    const diasSemana = {
        domingo: 'Domingo',
        segunda: 'Segunda',
        terca: 'Terça',
        quarta: 'Quarta',
        quinta: 'Quinta',
        sexta: 'Sexta',
        sabado: 'Sábado'
    };

    const formatarDias = (dias) => {
        if (!dias || dias.length === 0) {
            return 'Não informado';
        }

        return dias
            .map(dia => diasSemana[dia.toLowerCase()] || dia)
            .join(', ');
    };

    const formatarStatus = (status) => {
        const statusFormatados = {
            ativo: 'Em uso',
            concluido: 'Concluído',
            interrompido: 'Interrompido'
        };

        return statusFormatados[status] || status;
    };

    return (
        <article className={style.card}>

            <div className={style.conteudo}>

                <div className={style.topo}>

                    <h3>{medicamento.nome}</h3>

                    <span className={`${style.status} ${style[medicamento.status]}`}>
                        {formatarStatus(medicamento.status)}
                    </span>

                </div>

                <div className={style.informacoes}>

                    <p>
                        <FaCalendarAlt />
                        {formatarDias(medicamento.dias)}
                    </p>

                    <p>
                        <FaClock />
                        {medicamento.horarios?.length
                            ? medicamento.horarios.join(' • ')
                            : 'Horários não informados'}
                    </p>

                    {medicamento.finalidade && (
                        <p>
                            <FaClipboardList />
                            {medicamento.finalidade}
                        </p>
                    )}

                </div>

            </div>

            <div className={style.acoes}>

                <button
                    type="button"
                    className={style.botaoDetalhes}
                    onClick={() => abrirDetalhes(medicamento)}
                >
                    Ver detalhes
                </button>

                <button
                    type="button"
                    className={style.botaoEditar}
                    onClick={() => editar(medicamento)}
                    title="Editar medicamento"
                >
                    <FaEdit />
                </button>

                <button
                    type="button"
                    className={style.botaoExcluir}
                    onClick={() => excluir(medicamento.id_medicamento)}
                    title="Excluir medicamento"
                >
                    <FaTrash />
                </button>

            </div>

        </article>
    );
};

export { CardMedicamentos };