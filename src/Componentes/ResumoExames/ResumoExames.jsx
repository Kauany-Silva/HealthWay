import { FaFileMedical, FaChartLine, FaExclamationCircle } from 'react-icons/fa';

import style from './ResumoExames.module.css';

const ResumoExames = ({ totalExames, totalIndicadores, resultadosAlterados }) => {

    const resumos = [
        {
            titulo: 'Exames cadastrados',
            valor: totalExames,
            icone: <FaFileMedical />
        },
        {
            titulo: 'Indicadores acompanhados',
            valor: totalIndicadores,
            icone: <FaChartLine />
        },
        {
            titulo: 'Resultados alterados',
            valor: resultadosAlterados,
            icone: <FaExclamationCircle />
        }
    ];

    return (
        <section className={style.resumo}>

            {resumos.map((item, index) => (
                <div className={style.card} key={index}>

                    <div className={style.icone}>
                        {item.icone}
                    </div>

                    <div className={style.informacoes}>
                        <p>{item.titulo}</p>
                        <h2>{item.valor}</h2>
                    </div>

                </div>
            ))}

        </section>
    );
};

export { ResumoExames };