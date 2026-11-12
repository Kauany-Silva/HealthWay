
import { useState } from 'react';
import styles from './CardVacina.module.css';

import {
    FaSyringe,
    FaCalendarDay,
    FaUserPlus,
    FaEdit,
    FaTrash
} from 'react-icons/fa';

const CardVacina = ({ vacina, onEditar, onExcluir }) => {

    const [menuAberto, setMenuAberto] = useState(false);

    if (!vacina) {
        return null;
    }

    const formatarData = (data) => {
        if (!data) return 'Não informada';

        const dataFormatada = new Date(data).toISOString().split('T')[0];
        const [ano, mes, dia] = dataFormatada.split('-');

        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className={styles.card}>
            <div className={styles.destaque}></div>

            <div className={styles.informacoesVacina}>
                <div className={styles.iconeVacina}>
                    <FaSyringe />
                </div>

                <div className={styles.descricao}>
                    <h3>{vacina.nome_vacina || vacina.nome}</h3>

                    <p>
                        {vacina.descricao || 'Informações sobre esta vacina.'}
                    </p>
                </div>
            </div>

            <div className={styles.detalhes}>
                <div className={styles.detalhe}>
                    <span className={styles.icone}>
                        <FaCalendarDay />
                    </span>

                    <div>
                        <span className={styles.rotulo}>
                            Data da vacinação
                        </span>

                        <strong>
                            {formatarData(
                                vacina.data_aplicacao || vacina.data
                            )}
                        </strong>
                    </div>
                </div>

                <div className={styles.detalhe}>
                    <span className={styles.icone}>
                        <FaUserPlus />
                    </span>

                    <div>
                        <span className={styles.rotulo}>
                            Idade
                        </span>

                        <strong>
                            {vacina.idade_na_aplicacao || vacina.idade}
                        </strong>
                    </div>
                </div>

                <div className={styles.detalhe}>
                    <span className={styles.icone}>
                        <FaSyringe />
                    </span>

                    <div>
                        <span className={styles.rotulo}>
                            Tipo de dose
                        </span>

                        <strong>
                            {vacina.nome_dose || vacina.dose}
                        </strong>
                    </div>
                </div>
            </div>

            <div className={styles.menuContainer}>
                <button
                    type="button"
                    className={styles.seta}
                    onClick={() => setMenuAberto(!menuAberto)}
                    aria-label="Opções da vacina"
                    aria-expanded={menuAberto}
                >
                    ›
                </button>

                {menuAberto && (
                    <div className={styles.menu}>
                        <button
                            type="button"
                            onClick={() => {
                                setMenuAberto(false);
                                onEditar?.(vacina);
                            }}
                        >
                            <FaEdit />
                            Editar vacina
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setMenuAberto(false);
                                onExcluir?.(vacina);
                            }}
                        >
                            <FaTrash />
                            Excluir vacina
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { CardVacina };