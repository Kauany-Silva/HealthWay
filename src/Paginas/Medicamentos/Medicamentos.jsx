import { useState, useEffect } from 'react';

import {
    CabecalhoMedicamentos,
    ResumoMedicamentos,
    AbasMedicamentos,
    CardMedicamentos,
    DetalhesMedicamento,
    AdicionarMedicamento
} from '../../Componentes';

import style from './Medicamentos.module.css';

const Medicamentos = () => {

    const [medicamentos, setMedicamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [medicamentoEmEdicao, setMedicamentoEmEdicao] = useState(null);
    const [medicamentoSelecionado, setMedicamentoSelecionado] = useState(null);

    const [abaAtiva, setAbaAtiva] = useState('emUso');


    // LER RESPOSTA DA API
    const lerResposta = async (resposta) => {
        const texto = await resposta.text();

        try {
            return texto ? JSON.parse(texto) : {};
        } catch {
            throw new Error('Não foi possível interpretar a resposta do servidor.');
        }
    };


    // BUSCAR MEDICAMENTOS
    const buscarMedicamentos = async () => {
        try {
            const resposta = await fetch('http://localhost:3001/medicamentos', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const dados = await lerResposta(resposta);

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao buscar medicamentos.');
            }

            setMedicamentos(dados.medicamentos || []);
            setErro('');

        } catch (erro) {
            console.error(erro);
            setErro(erro.message);

        } finally {
            setCarregando(false);
        }
    };


    useEffect(() => {
        buscarMedicamentos();
    }, []);


    // ABRIR FORMULÁRIO PARA NOVO MEDICAMENTO
    const abrirNovoMedicamento = () => {
        setMedicamentoEmEdicao(null);
        setModalAberto(true);
    };


    // ABRIR FORMULÁRIO PARA EDITAR
    const abrirEdicao = (medicamento) => {
        setMedicamentoSelecionado(null);
        setMedicamentoEmEdicao(medicamento);
        setModalAberto(true);
    };


    // SALVAR OU EDITAR MEDICAMENTO
    const salvarMedicamento = async (dadosMedicamento) => {
        try {
            const editando = Boolean(medicamentoEmEdicao);

            const url = editando
                ? `http://localhost:3001/medicamentos/${medicamentoEmEdicao.id_medicamento}`
                : 'http://localhost:3001/medicamentos';

            const resposta = await fetch(url, {
                method: editando ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dadosMedicamento)
            });

            const dados = await lerResposta(resposta);

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao salvar medicamento.');
            }

            setModalAberto(false);
            setMedicamentoEmEdicao(null);

            await buscarMedicamentos();

        } catch (erro) {
            console.error(erro);
            setErro(erro.message);
        }
    };


    // EXCLUIR MEDICAMENTO
    const excluirMedicamento = async (id) => {

        if (!window.confirm('Deseja realmente excluir este medicamento?')) {
            return;
        }

        try {
            const resposta = await fetch(
                `http://localhost:3001/medicamentos/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const dados = await lerResposta(resposta);

            if (!resposta.ok) {
                throw new Error(dados.message || 'Erro ao excluir medicamento.');
            }

            setMedicamentoSelecionado(null);

            await buscarMedicamentos();

        } catch (erro) {
            console.error(erro);
            setErro(erro.message);
        }
    };


    // FILTRAR MEDICAMENTOS DAS ABAS
    const medicamentosFiltrados = medicamentos.filter((medicamento) => {

        if (abaAtiva === 'emUso') {
            return medicamento.status === 'ativo';
        }

        return ['concluido', 'interrompido'].includes(medicamento.status);
    });


    return (
        <main className={style.container}>

            <CabecalhoMedicamentos abrirModal={abrirNovoMedicamento} />

            <ResumoMedicamentos medicamentos={medicamentos} />

            <AbasMedicamentos
                abaAtiva={abaAtiva}
                setAbaAtiva={setAbaAtiva}
            />


            {erro && (
                <p className={style.erro}>
                    {erro}
                </p>
            )}


            {carregando && (
                <p className={style.carregando}>
                    Carregando medicamentos...
                </p>
            )}


            {!carregando && !erro && medicamentosFiltrados.length === 0 && (
                <p className={style.vazio}>
                    {abaAtiva === 'emUso'
                        ? 'Você não possui medicamentos em uso.'
                        : 'Seu histórico de medicamentos está vazio.'}
                </p>
            )}


            {!carregando && !erro && medicamentosFiltrados.map((medicamento) => (
                <CardMedicamentos
                    key={medicamento.id_medicamento}
                    medicamento={medicamento}
                    abrirDetalhes={setMedicamentoSelecionado}
                    editar={abrirEdicao}
                    excluir={excluirMedicamento}
                />
            ))}


            {/* MODAL DE CADASTRO E EDIÇÃO */}
            {modalAberto && (
                <AdicionarMedicamento
                    fechar={() => {
                        setModalAberto(false);
                        setMedicamentoEmEdicao(null);
                    }}
                    salvar={salvarMedicamento}
                    medicamentoInicial={medicamentoEmEdicao}
                />
            )}


            {/* MODAL DE DETALHES */}
            {medicamentoSelecionado && (
                <DetalhesMedicamento
                    medicamento={medicamentoSelecionado}
                    fechar={() => setMedicamentoSelecionado(null)}
                    editar={abrirEdicao}
                    excluir={excluirMedicamento}
                />
            )}

        </main>
    );
};

export { Medicamentos };