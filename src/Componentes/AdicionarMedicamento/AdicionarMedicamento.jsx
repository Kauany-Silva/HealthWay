import { useState, useEffect } from 'react';
import { FaTimes, FaClock } from 'react-icons/fa';

import style from './AdicionarMedicamento.module.css';

const diasSemana = [
    { valor: 'domingo', nome: 'D' },
    { valor: 'segunda', nome: 'S' },
    { valor: 'terca', nome: 'T' },
    { valor: 'quarta', nome: 'Q' },
    { valor: 'quinta', nome: 'Q' },
    { valor: 'sexta', nome: 'S' },
    { valor: 'sabado', nome: 'S' }
];

const AdicionarMedicamento = ({
    fechar,
    salvar,
    medicamentoInicial = null
}) => {

    const [nome, setNome] = useState('');
    const [finalidade, setFinalidade] = useState('');
    const [dias, setDias] = useState([]);
    const [quantidade, setQuantidade] = useState('1');
    const [horarios, setHorarios] = useState(['']);

    // PREENCHER FORMULÁRIO NA EDIÇÃO
    useEffect(() => {
        if (medicamentoInicial) {
            setNome(medicamentoInicial.nome || '');
            setFinalidade(medicamentoInicial.finalidade || '');
            setDias(medicamentoInicial.dias || []);

            const horariosIniciais = medicamentoInicial.horarios || [''];

            setHorarios(horariosIniciais);
            setQuantidade(String(horariosIniciais.length));
        }
    }, [medicamentoInicial]);

    // SELECIONAR DIAS
    const alternarDia = (dia) => {
        setDias((diasAtuais) => {
            if (diasAtuais.includes(dia)) {
                return diasAtuais.filter(item => item !== dia);
            }

            return [...diasAtuais, dia];
        });
    };

    // ALTERAR QUANTIDADE DE HORÁRIOS
    const alterarQuantidade = (valor) => {
        const novaQuantidade = Number(valor);

        setQuantidade(valor);

        setHorarios((horariosAtuais) => {
            return Array.from(
                { length: novaQuantidade },
                (_, indice) => horariosAtuais[indice] || ''
            );
        });
    };

    // ALTERAR HORÁRIO
    const alterarHorario = (indice, valor) => {
        setHorarios((horariosAtuais) => {
            const novosHorarios = [...horariosAtuais];

            novosHorarios[indice] = valor;

            return novosHorarios;
        });
    };

    // SALVAR FORMULÁRIO
    const enviarFormulario = (e) => {
        e.preventDefault();

        if (dias.length === 0) {
            alert('Selecione pelo menos um dia da semana.');
            return;
        }

        if (horarios.some(horario => !horario)) {
            alert('Preencha todos os horários.');
            return;
        }

        const dadosMedicamento = {
            nome: nome.trim(),
            finalidade: finalidade.trim(),
            dias,
            horarios
        };

        salvar(dadosMedicamento);
    };

    return (
        <div className={style.overlay}>

            <section className={style.modal}>

                <header className={style.cabecalho}>

                    <div>
                        <h2>
                            {medicamentoInicial
                                ? 'Editar medicamento'
                                : 'Novo medicamento'}
                        </h2>

                        <p>
                            Preencha as informações do medicamento.
                        </p>
                    </div>

                    <button
                        type="button"
                        className={style.fechar}
                        onClick={fechar}
                    >
                        <FaTimes />
                    </button>

                </header>

                <form onSubmit={enviarFormulario}>

                    <div className={style.campo}>
                        <label htmlFor="nome">Nome do medicamento</label>

                        <input
                            id="nome"
                            type="text"
                            placeholder="Ex: Vitamina C"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="finalidade">Finalidade</label>

                        <textarea
                            id="finalidade"
                            placeholder="Para que serve este medicamento?"
                            value={finalidade}
                            onChange={(e) => setFinalidade(e.target.value)}
                            rows="3"
                        />
                    </div>

                    <div className={style.campo}>

                        <label>Dias da semana</label>

                        <p className={style.ajuda}>
                            Selecione os dias em que deverá tomar o medicamento.
                        </p>

                        <div className={style.dias}>
                            {diasSemana.map(dia => (

                                <button
                                    key={dia.valor}
                                    type="button"
                                    className={`${style.dia} ${
                                        dias.includes(dia.valor)
                                            ? style.diaSelecionado
                                            : ''
                                    }`}
                                    onClick={() => alternarDia(dia.valor)}
                                    aria-pressed={dias.includes(dia.valor)}
                                    aria-label={dia.valor}
                                >
                                    {dia.nome}
                                </button>

                            ))}
                        </div>

                    </div>

                    <div className={style.campo}>

                        <label htmlFor="quantidade">
                            Quantas vezes por dia?
                        </label>

                        <select
                            id="quantidade"
                            value={quantidade}
                            onChange={(e) => alterarQuantidade(e.target.value)}
                        >
                            {[1, 2, 3, 4, 5, 6].map(numero => (
                                <option key={numero} value={numero}>
                                    {numero} {numero === 1 ? 'vez' : 'vezes'} ao dia
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className={style.campo}>

                        <label>Horários</label>

                        <div className={style.horarios}>

                            {horarios.map((horario, indice) => (

                                <div
                                    key={indice}
                                    className={style.campoHorario}
                                >

                                    <label htmlFor={`horario-${indice}`}>
                                        {indice + 1}º horário
                                    </label>

                                    <div className={style.inputHorario}>
                                        <FaClock />

                                        <input
                                            id={`horario-${indice}`}
                                            type="time"
                                            value={horario}
                                            onChange={(e) =>
                                                alterarHorario(indice, e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    <footer className={style.acoes}>

                        <button
                            type="button"
                            className={style.botaoCancelar}
                            onClick={fechar}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className={style.botaoSalvar}
                        >
                            {medicamentoInicial
                                ? 'Salvar alterações'
                                : 'Adicionar medicamento'}
                        </button>

                    </footer>

                </form>

            </section>

        </div>
    );
};

export { AdicionarMedicamento };