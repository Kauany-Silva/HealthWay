
import { useState, useEffect } from 'react';

import styles from './AdicionarVacina.module.css';
import Logo from '../../Assets/Imagens/Logo.png';

const AdicionarVacina = ({
    fechar,
    salvar,
    vacinaEdicao,
    editar
}) => {
    const [vacinas, setVacinas] = useState([]);
    const [doses, setDoses] = useState([]);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const modoEdicao = Boolean(vacinaEdicao);

    // Buscar vacinas e tipos de dose
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

    // Formatar data para o campo input date
    const formatarDataInput = (data) => {
        if (!data) return '';

        return String(data).slice(0, 10);
    };

    // Salvar ou editar vacinação
    const handleSubmit = async (evento) => {
        evento.preventDefault();

        const formulario = evento.currentTarget;
        const dados = new FormData(formulario);

        const dadosVacina = {
            id_vacina: Number(dados.get('vacina')),
            data: dados.get('data'),
            idade: dados.get('idade').trim(),
            id_dose: Number(dados.get('dose'))
        };

        try {
            const sucesso = modoEdicao
                ? await editar(dadosVacina)
                : await salvar(dadosVacina);

            if (sucesso) {
                fechar();
            }

        } catch (erro) {
            console.error(erro);
            setErro('Não foi possível salvar a vacinação.');
        }
    };

    return (
        <div className={styles.fundo}>
            <div className={styles.container}>

                <h2>
                    {modoEdicao
                        ? 'Editar Vacina'
                        : 'Adicionar Vacina'
                    }
                </h2>

                <div className={styles.logo}>
                    <img
                        src={Logo}
                        alt="Logo Health Way"
                    />
                </div>

                {carregando ? (
                    <p>Carregando dados...</p>

                ) : erro ? (
                    <p>{erro}</p>

                ) : (
                    <form onSubmit={handleSubmit}>

                        {/* Nome da vacina */}
                        <label htmlFor="vacina">
                            Nome da vacina
                        </label>

                        <select
                            id="vacina"
                            name="vacina"
                            required
                            defaultValue={
                                vacinaEdicao?.id_vacina || ''
                            }
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

                        {/* Data da vacinação */}
                        <label htmlFor="data">
                            Data da vacinação
                        </label>

                        <input
                            type="date"
                            id="data"
                            name="data"
                            required
                            defaultValue={formatarDataInput(
                                vacinaEdicao?.data_aplicacao
                            )}
                        />

                        {/* Idade na vacinação */}
                        <label htmlFor="idade">
                            Idade na vacinação
                        </label>

                        <input
                            type="text"
                            id="idade"
                            name="idade"
                            placeholder="Ex.: 2 meses ou 10 anos"
                            required
                            defaultValue={
                                vacinaEdicao?.idade_na_aplicacao || ''
                            }
                        />

                        {/* Tipo de dose */}
                        <label htmlFor="dose">
                            Tipo de dose
                        </label>

                        <select
                            id="dose"
                            name="dose"
                            required
                            defaultValue={
                                vacinaEdicao?.id_dose || ''
                            }
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

                        {/* Botões */}
                        <div className={styles.acoes}>

                            <button
                                type="button"
                                onClick={fechar}
                            >
                                Cancelar
                            </button>

                            <button type="submit">
                                {modoEdicao
                                    ? 'Salvar alterações'
                                    : 'Salvar vacina'
                                }
                            </button>

                        </div>

                    </form>
                )}

            </div>
        </div>
    );
};

export { AdicionarVacina };
