
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';

import style from './GraficoExame.module.css';

const GraficoExame = ({ resultados, nomeIndicador }) => {

    const dados = resultados.map((resultado) => ({
        data: new Date(resultado.data_exame).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        }),
        valor: Number(resultado.valor_numero)
    }));

    const referenciaMin = Number(resultados[0]?.referencia_min);
    const referenciaMax = Number(resultados[0]?.referencia_max);

    return (
        <section className={style.grafico}>

            <div className={style.cabecalho}>
                <h3>{nomeIndicador}</h3>
                <p>Evolução dos resultados</p>
            </div>

            <div className={style.areaGrafico}>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dados}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="data" />

                        <YAxis />

                        <Tooltip />

                        {!isNaN(referenciaMin) && (
                            <ReferenceLine
                                y={referenciaMin}
                                stroke="var(--Vermelho)"
                                strokeDasharray="5 5"
                            />
                        )}

                        {!isNaN(referenciaMax) && (
                            <ReferenceLine
                                y={referenciaMax}
                                stroke="var(--Vermelho)"
                                strokeDasharray="5 5"
                            />
                        )}

                        <Line
                            type="monotone"
                            dataKey="valor"
                            stroke="var(--AzulRoyal)"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 7 }}
                        />

                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className={style.legenda}>
                <span>
                    <i className={style.linhaAzul}></i>
                    Seus resultados
                </span>

                <span>
                    <i className={style.linhaVermelha}></i>
                    Valores de referência
                </span>
            </div>

        </section>
    );
};

export { GraficoExame };
