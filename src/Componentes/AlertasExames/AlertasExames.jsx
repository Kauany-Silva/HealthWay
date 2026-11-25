
import { FaExclamationTriangle, FaChevronRight } from 'react-icons/fa';

import style from './AlertasExames.module.css';

const AlertasExames = ({ alertas, abrirAlertas }) => {

    return (
        <section className={style.alertas}>

            <div className={style.informacoes}>
                <div className={style.icone}>
                    <FaExclamationTriangle />
                </div>

                <div>
                    <h3>Resultados que precisam de atenção</h3>

                    <p>
                        {alertas.length > 0
                            ? `Você possui ${alertas.length} resultado(s) fora dos valores de referência.`
                            : 'Nenhum resultado fora dos valores de referência foi identificado.'}
                    </p>
                </div>
            </div>

            {alertas.length > 0 && (
                <button
                    className={style.botaoVer}
                    onClick={abrirAlertas}
                >
                    Ver resultados
                    <FaChevronRight />
                </button>
            )}

        </section>
    );
};

export { AlertasExames };
