
import {
    FaCalendarCheck,
    FaRegCalendarAlt,
    FaCalendarWeek
} from 'react-icons/fa';

import style from './Resumo.module.css';

const Resumo = ({ consultas = [] }) => {

    // DATA ATUAL
    const hoje = new Date();

    const formatarData = (data) => {
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const dia = String(data.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    };

    const dataHoje = formatarData(hoje);

    // PRÓXIMOS 7 DIAS
    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 7);

    const dataLimite = formatarData(limite);

    // CONSULTAS AGENDADAS
    const agendadas = consultas.filter(
        consulta => consulta.status?.toLowerCase() === 'agendada'
    );

    // CONSULTAS DE HOJE
    const consultasHoje = agendadas.filter(
        consulta => String(consulta.data).slice(0, 10) === dataHoje
    ).length;

    // PRÓXIMOS 7 DIAS (SEM CONTAR HOJE)
    const proximosSeteDias = agendadas.filter(consulta => {
        const data = String(consulta.data).slice(0, 10);

        return data > dataHoje && data <= dataLimite;
    }).length;

    const indicadores = [
        {
            id: 1,
            titulo: 'Consultas agendadas',
            valor: agendadas.length,
            descricao: 'Total de compromissos futuros',
            icone: <FaCalendarCheck />,        },
        {
            id: 2,
            titulo: 'Consultas hoje',
            valor: consultasHoje,
            descricao: 'Compromissos para hoje',
            icone: <FaRegCalendarAlt />,      
          },
        {
            id: 3,
            titulo: 'Próximos 7 dias',
            valor: proximosSeteDias,
            descricao: 'Compromissos nos próximos dias',
            icone: <FaCalendarWeek />,
        }
    ];

    return (

        <section className={style.resumo}>

            {indicadores.map(indicador => (

                <article
                    key={indicador.id}
                    className={`${style.card} ${style[indicador.cor]}`}
                >

                    <div className={style.topoCard}>

                        <div className={style.icone}>
                            {indicador.icone}
                        </div>

                        <span className={style.indicador}>
                            {indicador.id === 1 ? 'VISÃO GERAL' :
                             indicador.id === 2 ? 'HOJE' : 'AGENDA'}
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

export { Resumo };
