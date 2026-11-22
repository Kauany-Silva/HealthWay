
import { useState, useEffect } from 'react';

import {
    CabecalhoConsultas,
    Resumo,
    Abas,
    CardConsulta,
    DetalhesConsulta,
    AdicionarConsulta
} from "../../Componentes";

import style from './Consultas.module.css';

const Consultas = () => {

    const [consultas, setConsultas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState('agendadas');
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);

    // BUSCAR CONSULTAS NO BACKEND
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

    useEffect(() => {
        buscarConsultas();
    }, []);

    // CADASTRAR NOVA CONSULTA
    const salvarConsulta = async (novaConsulta) => {

        try {

            const resposta = await fetch('http://localhost:3001/consultas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(novaConsulta)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao cadastrar consulta.');
            }

            setModalAberto(false);
            setErro('');
            await buscarConsultas();

        } catch (erro) {

            console.error(erro);
            setErro(erro.message);

        }
    };

    // FILTRAR CONSULTAS DE ACORDO COM A ABA
    const consultasFiltradas = consultas.filter((consulta) => {

        if (abaAtiva === 'agendadas') {
            return ['agendada', 'remarcada'].includes(consulta.status);
        }

        return ['realizada', 'nao_compareceu', 'cancelada'].includes(consulta.status);

    });

    // ABRIR DETALHES
    const abrirDetalhes = (consulta) => {
        setConsultaSelecionada(consulta);
    };

    // FECHAR DETALHES
    const fecharDetalhes = () => {
        setConsultaSelecionada(null);
    };

    return (
        <main className={style.container}>

            <CabecalhoConsultas
                abrirModal={() => setModalAberto(true)}
            />

            <Resumo consultas={consultas} />

            <Abas
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
            />

            {erro && <p>{erro}</p>}

            {carregando && <p>Carregando consultas...</p>}

            {!carregando && !erro && consultasFiltradas.length === 0 && (
                <p>
                    {abaAtiva === 'agendadas'
                        ? 'Você não possui consultas agendadas.'
                        : 'Seu histórico de consultas está vazio.'}
                </p>
            )}

            {!carregando && !erro && consultasFiltradas.map((consulta) => (

                <CardConsulta
                    key={consulta.id_consulta}
                    consulta={consulta}
                    abrirDetalhes={abrirDetalhes}
                />

            ))}

            {modalAberto && (
                <AdicionarConsulta
                    fechar={() => setModalAberto(false)}
                    salvar={salvarConsulta}
                />
            )}

            {consultaSelecionada && (
                <DetalhesConsulta
                    consulta={consultaSelecionada}
                    fechar={fecharDetalhes}
                />
            )}

        </main>
    );
};

export { Consultas };
