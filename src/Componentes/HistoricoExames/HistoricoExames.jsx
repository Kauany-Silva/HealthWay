
import { FaSearch } from 'react-icons/fa';

import { CardExame } from '../CardExame/CardExame';

import style from './HistoricoExames.module.css';

const HistoricoExames = ({ exames, selecionarExame }) => {

    return (
        <section className={style.historico}>

            <div className={style.cabecalho}>
                <div>
                    <h2>Histórico de exames</h2>
                    <p>Consulte os exames que você já cadastrou.</p>
                </div>
            </div>

            {exames.length > 0 ? (

                <div className={style.lista}>
                    {exames.map((exame) => (
                        <CardExame
                            key={exame.id_exame}
                            exame={exame}
                            selecionarExame={() => selecionarExame(exame)}
                        />
                    ))}
                </div>

            ) : (

                <div className={style.vazio}>
                    <FaSearch />
                    <h3>Nenhum exame cadastrado</h3>
                    <p>
                        Seus exames enviados aparecerão aqui.
                    </p>
                </div>

            )}

        </section>
    );
};

export { HistoricoExames };
