
import { useState, useEffect } from 'react';

import styles from './AdicionarVacina.module.css';
import Logo from '../../Assets/Imagens/Logo.png';

const AdicionarVacina = ({ fechar, salvar }) => {
    const [vacinas, setVacinas] = useState([]);
    const [doses, setDoses] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const [respostaVacinas, respostaDoses] =
                    await Promise.all([
                        fetch('http://localhost:3001/catalogos/vacinas'),
                        fetch('http://localhost:3001/catalogos/doses')
                    ]);

                if (!respostaVacinas.ok || !respostaDoses.ok) {
                    throw new Error('Erro ao buscar os dados.');
                }

                const dadosVacinas = await respostaVacinas.json();
                const dadosDoses = await respostaDoses.json();

                setVacinas(dadosVacinas.vacinas);
                setDoses(dadosDoses.doses);

            } catch (erro) {
                console.error(erro);
                setErro('Não foi possível carregar as vacinas e doses.');
            } finally {
                setCarregando(false);
            }
        };

        buscarDados();
    }, []);

    const handleSubmit = async (evento) => {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const dados = new FormData(formulario);

        const novaVacina = {
            id_vacina: Number(dados.get('vacina')),
            data: dados.get('data'),
            idade: dados.get('idade').trim(),
            id_dose: Number(dados.get('dose'))
        };

        const sucesso = await salvar(novaVacina);

        if (sucesso) {
            formulario.reset();
        }
    };

    return (
        <div className={styles.fundo}>
            <div className={styles.container}>
                <h2>Adicionar Vacina</h2>

                <div className={styles.logo}>
                    <img src={Logo} alt="Logo Health Way" />
                </div>

                {carregando ? (
                    <p>Carregando dados...</p>
                ) : erro ? (
                    <p>{erro}</p>
                ) : (
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

                            {vacinas.map((vacina) => (
                                <option
                                    key={vacina.id_vacina}
                                    value={vacina.id_vacina}
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

                            {doses.map((dose) => (
                                <option
                                    key={dose.id_dose}
                                    value={dose.id_dose}
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
                )}
            </div>
        </div>
    );
};

export { AdicionarVacina };
