
import { useState, useEffect } from 'react';

import {
    CabecalhoConsultas,
    ResumoConsultas,
    Abas,
    CardConsulta,
    DetalhesConsulta,
    AdicionarConsulta
} from '../../Componentes';

import style from './Consultas.module.css';

const Consultas = () => {

    const [consultas, setConsultas] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [consultaEmEdicao, setConsultaEmEdicao] = useState(null);
    const [consultaSelecionada, setConsultaSelecionada] = useState(null);

    const [abaAtiva, setAbaAtiva] = useState('agendadas');

    const buscarConsultas = async () => {
        try {
            const resposta = await fetch('http://localhost:3001/consultas', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao buscar consultas.');
            }

            setConsultas(dados.consultas || []);
            setErro('');

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


    // ABRIR FORMULÁRIO PARA NOVA CONSULTA
    const abrirNovaConsulta = () => {
        setConsultaEmEdicao(null);
        setModalAberto(true);
    };


    // ABRIR FORMULÁRIO PARA EDITAR
    const abrirEdicao = (consulta) => {
        setConsultaSelecionada(null);
        setConsultaEmEdicao(consulta);
        setModalAberto(true);
    };


    // SALVAR OU EDITAR CONSULTA
    const salvarConsulta = async (dadosConsulta) => {
        try {
            const editando = Boolean(consultaEmEdicao);

            const url = editando
                ? `http://localhost:3001/consultas/${consultaEmEdicao.id_consulta}`
                : 'http://localhost:3001/consultas';

            const resposta = await fetch(url, {
                method: editando ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dadosConsulta)
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao salvar consulta.');
            }

            setModalAberto(false);
            setConsultaEmEdicao(null);

            await buscarConsultas();

        } catch (erro) {
            console.error(erro);
            setErro(erro.message);
        }
    };


    // CONCLUIR OU CANCELAR CONSULTA
    const atualizarStatus = async (id, novoStatus) => {

        const mensagem = novoStatus === 'realizada'
            ? 'Deseja realmente marcar esta consulta como concluída?'
            : 'Deseja realmente cancelar esta consulta?';

        if (!window.confirm(mensagem)) {
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3001/consultas/${id}/status`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ status: novoStatus })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao atualizar consulta.');
            }

            setConsultaSelecionada(null);

            await buscarConsultas();

        } catch (erro) {
            console.error(erro);
            setErro(erro.message);
        }
    };


    // FILTRAR CONSULTAS DAS ABAS
    const consultasFiltradas = consultas.filter((consulta) => {
        if (abaAtiva === 'agendadas') {
            return ['agendada', 'remarcada'].includes(consulta.status);
        }

        return [
            'realizada',
            'nao_compareceu',
            'cancelada'
        ].includes(consulta.status);
    });


    return (
        <main className={style.container}>

            <CabecalhoConsultas abrirModal={abrirNovaConsulta} />

            <ResumoConsultas consultas={consultas} />

            <Abas
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
            />

            {erro && (
                <p className={style.erro}>
                    {erro}
                </p>
            )}

            {carregando && (
                <p>Carregando consultas...</p>
            )}

            {!carregando && !erro && consultasFiltradas.length === 0 && (
                <p className={style.vazio}>
                    {abaAtiva === 'agendadas'
                        ? 'Você não possui consultas agendadas.'
                        : 'Seu histórico de consultas está vazio.'}
                </p>
            )}

            {!carregando && !erro && consultasFiltradas.map((consulta) => (
                <CardConsulta
                    key={consulta.id_consulta}
                    consulta={consulta}
                    abrirDetalhes={setConsultaSelecionada}
                />
            ))}


            {modalAberto && (
                <AdicionarConsulta
                    fechar={() => {
                        setModalAberto(false);
                        setConsultaEmEdicao(null);
                    }}
                    salvar={salvarConsulta}
                    consultaInicial={consultaEmEdicao}
                />
            )}


            {consultaSelecionada && (
                <DetalhesConsulta
                    consulta={consultaSelecionada}
                    fechar={() => setConsultaSelecionada(null)}
                    editar={abrirEdicao}
                    concluir={(id) => atualizarStatus(id, 'realizada')}
                    cancelar={(id) => atualizarStatus(id, 'cancelada')}
                />
            )}

        </main>
    );
};

export { Consultas };
