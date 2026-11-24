
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import style from './AdicionarConsulta.module.css';

const AdicionarConsulta = ({ fechar, salvar, consultaInicial = null }) => {

    const [formulario, setFormulario] = useState({
        tipo: consultaInicial?.tipo || '',
        data: consultaInicial?.data
            ? String(consultaInicial.data).slice(0, 10)
            : '',
        hora: consultaInicial?.hora?.slice(0, 5) || '',
        profissional: consultaInicial?.profissional || '',
        local: consultaInicial?.local || '',
        observacoes: consultaInicial?.observacoes || ''
    });

    const atualizarCampo = (evento) => {
        const { name, value } = evento.target;

        setFormulario((anterior) => ({
            ...anterior,
            [name]: value
        }));
    };

    const enviarFormulario = (evento) => {
        evento.preventDefault();
        salvar(formulario);
    };

    const editando = Boolean(consultaInicial);

    return (
        <div className={style.overlay} onClick={fechar}>
            <section
                className={style.modal}
                onClick={(evento) => evento.stopPropagation()}
            >
                <header className={style.cabecalho}>
                    <div>
                        <span>AGENDA</span>
                        <h2>{editando ? 'Editar consulta' : 'Nova consulta'}</h2>
                        <p>
                            {editando
                                ? 'Atualize as informações da sua consulta.'
                                : 'Preencha as informações para agendar sua consulta.'}
                        </p>
                    </div>

                    <button
                        type="button"
                        className={style.fechar}
                        onClick={fechar}
                        aria-label="Fechar formulário"
                    >
                        <FaTimes />
                    </button>
                </header>

                <form onSubmit={enviarFormulario}>
                    <div className={style.conteudo}>
                        <div className={style.campo}>
                            <label htmlFor="tipo">Tipo de consulta</label>
                            <input
                                type="text"
                                id="tipo"
                                name="tipo"
                                placeholder="Ex.: Clínico geral"
                                value={formulario.tipo}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>

                        <div className={style.linha}>
                            <div className={style.campo}>
                                <label htmlFor="data">Data</label>
                                <input
                                    type="date"
                                    id="data"
                                    name="data"
                                    min={new Date().toLocaleDateString('en-CA')}
                                    value={formulario.data}
                                    onChange={atualizarCampo}
                                    required
                                />
                            </div>

                            <div className={style.campo}>
                                <label htmlFor="hora">Horário</label>
                                <input
                                    type="time"
                                    id="hora"
                                    name="hora"
                                    value={formulario.hora}
                                    onChange={atualizarCampo}
                                    required
                                />
                            </div>
                        </div>

                        <div className={style.campo}>
                            <label htmlFor="profissional">Profissional</label>
                            <input
                                type="text"
                                id="profissional"
                                name="profissional"
                                placeholder="Nome do profissional"
                                value={formulario.profissional}
                                onChange={atualizarCampo}
                                required
                            />
                        </div>

                        <div className={style.campo}>
                            <label htmlFor="local">Local</label>
                            <input
                                type="text"
                                id="local"
                                name="local"
                                placeholder="Clínica, hospital ou endereço"
                                value={formulario.local}
                                onChange={atualizarCampo}
                            />
                        </div>

                        <div className={style.campo}>
                            <label htmlFor="observacoes">Observações</label>
                            <textarea
                                id="observacoes"
                                name="observacoes"
                                placeholder="Informações adicionais (opcional)"
                                value={formulario.observacoes}
                                onChange={atualizarCampo}
                                rows="3"
                            />
                        </div>
                    </div>

                    <footer className={style.rodape}>
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
                            {editando ? 'Salvar alterações' : 'Salvar consulta'}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
};

export { AdicionarConsulta };
