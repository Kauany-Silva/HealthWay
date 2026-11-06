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

    // Buscar vacinações do usuário ao abrir a carteira
    useEffect(() => {
        const buscarVacinas = async () => {
            if (!user?.id_usuario) return;

            try {
                const resposta = await fetch(
                'http://localhost:3001/vacinacao',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

                const dados = await resposta.json();

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
    }, [user]);

    // Salvar uma nova vacinação
    const adicionarVacina = async (novaVacina) => {
        try {
            const resposta = await fetch(
                'http://localhost:3001/vacinacao', {
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

            // Atualizar a lista com os dados do banco
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
            setModalAberto(false);
            setErro('');

            return true;

        } catch (erro) {
            console.error(erro);
            setErro(erro.message || 'Erro ao salvar a vacinação.');

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
                        />
                    ))}
                </div>

                <div className={styles.botao}>
                    <button onClick={() => setModalAberto(true)}>
                        Adicionar Vacina
                    </button>
                </div>
            </div>

            {modalAberto && (
                <AdicionarVacina
                    fechar={() => setModalAberto(false)}
                    salvar={adicionarVacina}
                />
            )}
        </div>
    );
};

export { Carteira };