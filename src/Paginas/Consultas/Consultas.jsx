
import { useState, useEffect } from 'react';

import style from './Consultas.module.css';

const Consultas = () => {

    const [consultas, setConsultas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    // BUSCAR CONSULTAS NO BACKEND
    useEffect(() => {

        const buscarConsultas = async () => {

            try {

                const resposta = await fetch('http://localhost:3001/consultas', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const dados = await resposta.json();

                if (!resposta.ok) {
                    throw new Error(dados.message || 'Erro ao buscar consultas.');
                }

                setConsultas(dados.consultas);

            } catch (erro) {

                console.error(erro);
                setErro(erro.message);

            } finally {

                setCarregando(false);

            }
        };

        buscarConsultas();

    }, []);

    // FORMATAR DATA
    const formatarData = (data) => {
        return new Date(data).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    return (
        <main className={style.container}>

            <h1>Minhas Consultas</h1>

            {carregando && <p>Carregando consultas...</p>}

            {erro && <p>{erro}</p>}

            {!carregando && !erro && consultas.length === 0 && (
                <p>Você ainda não possui consultas cadastradas.</p>
            )}

            {!carregando && !erro && consultas.map((consulta) => (

                <article key={consulta.id_consulta}>

                    <h2>{consulta.tipo}</h2>

                    <p>Profissional: {consulta.profissional}</p>

                    <p>Data: {formatarData(consulta.data)}</p>

                    <p>Horário: {consulta.hora.slice(0, 5)}</p>

                    <p>Status: {consulta.status}</p>

                </article>

            ))}

        </main>
    );
};

export { Consultas };
