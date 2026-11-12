
import { useState, useEffect } from 'react';

import styles from './Carteira.module.css';

import { AdicionarVacina } from '../AdicionarVacina/AdicionarVacina';
import { CardVacina } from '../CardVacina/CardVacina';

import { useAuth } from '../../Context/AuthContext';

const Carteira = () => {
    const { user, token } = useAuth();

    const [modalAberto, setModalAberto] = useState(false);
    const [vacinas, setVacinas] = useState([]);
    const [erro, setErro] = useState('');
    const [vacinaEmEdicao, setVacinaEmEdicao] = useState(null);

    // Buscar vacinações
    useEffect(() => {
        const buscarVacinas = async () => {
            if (!user?.id_usuario || !token) return;

            try {
                const resposta = await fetch(
                    'http://localhost:3001/vacinacao',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const textoResposta = await resposta.text();

let dados;

try {
    dados = JSON.parse(textoResposta);
} catch {
    console.error('Resposta recebida do servidor:', textoResposta);

    throw new Error(
        'O servidor retornou uma resposta inválida. Confira a rota PUT no backend.'
    );
}

                if (!resposta.ok) {
                    throw new Error(dados.message);
                }

                setVacinas(dados.vacinas);

            } catch (erro) {
                console.error(erro);
                setErro('Não foi possível carregar suas vacinações.');
            }
        };

        buscarVacinas();
    }, [user, token]);


    // Adicionar vacinação
    const adicionarVacina = async (novaVacina) => {
        try {
            const resposta = await fetch(
                'http://localhost:3001/vacinacao',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id_vacina: novaVacina.id_vacina,
                        id_dose: novaVacina.id_dose,
                        data_aplicacao: novaVacina.data,
                        idade_na_aplicacao: novaVacina.idade
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message);
            }

            const respostaLista = await fetch(
                'http://localhost:3001/vacinacao',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const dadosLista = await respostaLista.json();

            if (!respostaLista.ok) {
                throw new Error(dadosLista.message);
            }

            setVacinas(dadosLista.vacinas);
            setErro('');

            return true;

        } catch (erro) {
            console.error(erro);
            setErro(erro.message || 'Erro ao salvar vacinação.');

            return false;
        }
    };


    // Excluir vacinação
    const excluirVacina = async (vacina) => {
        const confirmar = window.confirm(
            `Deseja realmente excluir a vacina ${vacina.nome_vacina}?`
        );

        if (!confirmar) return;

        try {
            const resposta = await fetch(
                `http://localhost:3001/vacinacao/${vacina.id_registro}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message);
            }

            setVacinas((listaAtual) =>
                listaAtual.filter(
                    (item) => item.id_registro !== vacina.id_registro
                )
            );

            setErro('');

        } catch (erro) {
            console.error(erro);
            setErro(erro.message || 'Erro ao excluir vacinação.');
        }
    };


    // Abrir formulário de edição
    const editarVacina = (vacina) => {
        setVacinaEmEdicao(vacina);
        setErro('');
        setModalAberto(true);
    };


    // Salvar edição no banco
    const salvarEdicaoVacina = async (dadosVacina) => {
        try {
            const resposta = await fetch(
                `http://localhost:3001/vacinacao/${vacinaEmEdicao.id_registro}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id_vacina: dadosVacina.id_vacina,
                        id_dose: dadosVacina.id_dose,
                        data_aplicacao: dadosVacina.data,
                        idade_na_aplicacao: dadosVacina.idade
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message);
            }

            const respostaLista = await fetch(
                'http://localhost:3001/vacinacao',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const dadosLista = await respostaLista.json();

            if (!respostaLista.ok) {
                throw new Error(dadosLista.message);
            }

            setVacinas(dadosLista.vacinas);
            setErro('');

            return true;

        } catch (erro) {
            console.error(erro);
            setErro(erro.message || 'Erro ao editar vacinação.');

            return false;
        }
    };


    return (
        <div className={styles.container}>

            <h1>Minha Carteira de Vacinação</h1>

            <div className={styles.carteira}>

                <h2>Health Way</h2>

                {erro && <p>{erro}</p>}

                <div className={styles.listaVacinas}>

                    {vacinas.map((vacina) => (
                        <CardVacina
                            key={vacina.id_registro}
                            vacina={vacina}
                            onExcluir={excluirVacina}
                            onEditar={editarVacina}
                        />
                    ))}

                </div>

                <div className={styles.botao}>
                    <button
                        onClick={() => {
                            setVacinaEmEdicao(null);
                            setErro('');
                            setModalAberto(true);
                        }}
                    >
                        Adicionar Vacina
                    </button>
                </div>

            </div>

            {modalAberto && (
                <AdicionarVacina
                    fechar={() => {
                        setModalAberto(false);
                        setVacinaEmEdicao(null);
                    }}
                    salvar={adicionarVacina}
                    vacinaEdicao={vacinaEmEdicao}
                    editar={salvarEdicaoVacina}
                />
            )}

        </div>
    );
};

export { Carteira };
