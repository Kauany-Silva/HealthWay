import styles from './AdicionarVacina.module.css';

import { DadosVacinas } from '../../Dados/DadosVacinas';

const AdicionarVacina = ({ fechar }) => {
    return (
        <div className={styles.fundo}>
            <div className={styles.container}>
                <h2>Adicionar Vacina</h2>

                <form>
                    <label htmlFor="vacina">
                        Nome da vacina
                    </label>

                    <select id="vacina" name="vacina" required defaultValue="">
                        <label htmlFor="vacina">
    Nome da vacina
</label>

<select
    id="vacina"
    name="vacina"
    required
    defaultValue=""
>
    <option value="" disabled>
        Selecione uma vacina
    </option>

    {DadosVacinas.map((vacina) => (
        <option
            key={vacina.id}
            value={vacina.nome}
        >
            {vacina.nome}
        </option>
    ))}
</select>
                    </select>

                    <label htmlFor="data">
                        Data da vacinação
                    </label>

                    <input
                        type="date"
                        id="data"
                        name="data"
                        required
                    />

                    <label htmlFor="idade">
                        Idade na vacinação
                    </label>

                    <input
                        type="text"
                        id="idade"
                        name="idade"
                        placeholder="Ex.: 2 meses ou 10 anos"
                        required
                    />

                    <label htmlFor="dose">
                        Tipo de dose
                    </label>

                    <select
                        id="dose"
                        name="dose"
                        required
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Selecione o tipo de dose
                        </option>
                        <option value="Dose única">Dose única</option>
                        <option value="1ª dose">1ª dose</option>
                        <option value="2ª dose">2ª dose</option>
                        <option value="3ª dose">3ª dose</option>
                        <option value="Reforço">Reforço</option>
                    </select>

                    <div className={styles.acoes}>
                        <button
                            type="button"
                            onClick={fechar}
                        >
                            Cancelar
                        </button>

                        <button type="submit">
                            Salvar vacina
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { AdicionarVacina };
