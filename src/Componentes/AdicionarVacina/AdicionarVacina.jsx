import styles from './AdicionarVacina.module.css';

import Logo from '../../Assets/Imagens/Logo.png';

import { DadosVacinas } from '../../Dados/DadosVacinas';
import { DadosDoses } from '../../Dados/DadosDoses';

const AdicionarVacina = ({ fechar, salvar }) => {
    const handleSubmit = (evento) => {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const dados = new FormData(formulario);

        const novaVacina = {
            nome: dados.get('vacina'),
            data: dados.get('data'),
            idade: dados.get('idade').trim(),
            dose: dados.get('dose'),
        };

        salvar(novaVacina);
        formulario.reset();
    };

    return (
        <div className={styles.fundo}>
            <div className={styles.container}>
                <h2>Adicionar Vacina</h2>

                <div className={styles.logo}>
                    <img src={Logo} alt="Logo Health Way" />
                </div>

                <form onSubmit={handleSubmit}>
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

                        {DadosDoses.map((dose) => (
                            <option
                                key={dose.id}
                                value={dose.nome}
                            >
                                {dose.nome}
                            </option>
                        ))}
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
