
import {
    FaPills,
    FaCalendarCheck,
    FaClock
} from 'react-icons/fa';

import style from './ResumoMedicamentos.module.css';

const ResumoMedicamentos = ({ medicamentos = [] }) => {

    // DATA ATUAL
    const hoje = new Date();

    const diasSemana = [
        'domingo',
        'segunda',
        'terca',
        'quarta',
        'quinta',
        'sexta',
        'sabado'
    ];

    const diaAtual = diasSemana[hoje.getDay()];

    // MEDICAMENTOS ATIVOS
    const medicamentosAtivos = medicamentos.filter(
        medicamento => medicamento.status === 'ativo'
    );

    // DOSES PREVISTAS PARA HOJE
    const dosesHoje = medicamentosAtivos
        .filter(medicamento => {
            return medicamento.dias?.includes(diaAtual);
        })
        .reduce((total, medicamento) => {
            return total + (medicamento.horarios?.length || 0);
        }, 0);

    // PRÓXIMO HORÁRIO
    const horarioAtual = hoje.getHours() * 60 + hoje.getMinutes();

    const proximosHorarios = medicamentosAtivos
        .filter(medicamento => {
            return medicamento.dias?.includes(diaAtual);
        })
        .flatMap(medicamento => medicamento.horarios || [])
        .filter(horario => {
            const [hora, minuto] = horario.split(':').map(Number);

            return hora * 60 + minuto >= horarioAtual;
        })
        .sort();

    const proximoHorario = proximosHorarios[0] || '--:--';

    const indicadores = [
        {
            id: 1,
            titulo: 'Medicamentos ativos',
            valor: medicamentosAtivos.length,
            descricao: 'Medicamentos em uso',
            icone: <FaPills />,
            etiqueta: 'VISÃO GERAL'
        },
        {
            id: 2,
            titulo: 'Doses de hoje',
            valor: dosesHoje,
            descricao: 'Horários programados para hoje',
            icone: <FaCalendarCheck />,
            etiqueta: 'HOJE'
        },
        {
            id: 3,
            titulo: 'Próximo horário',
            valor: proximoHorario,
            descricao: 'Próxima dose programada',
            icone: <FaClock />,
            etiqueta: 'LEMBRETE'
        }
    ];

    return (

        <section className={style.resumo}>

            {indicadores.map(indicador => (

                <article
                    key={indicador.id}
                    className={style.card}
                >

                    <div className={style.topoCard}>

                        <div className={style.icone}>
                            {indicador.icone}
                        </div>

                        <span className={style.indicador}>
                            {indicador.etiqueta}
                        </span>

                    </div>

                    <div className={style.conteudo}>

                        <strong>{indicador.valor}</strong>

                        <h3>{indicador.titulo}</h3>

                        <p>{indicador.descricao}</p>

                    </div>

                </article>

            ))}

        </section>
    );
};

export { ResumoMedicamentos };
