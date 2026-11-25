
import { useState } from 'react';

import { FaCloudUploadAlt, FaTimes, FaFileMedical } from 'react-icons/fa';

import style from './AdicionarExame.module.css';

const AdicionarExame = ({ fechar, salvar }) => {

    const [nomeExame, setNomeExame] = useState('');
    const [dataExame, setDataExame] = useState('');
    const [arquivo, setArquivo] = useState(null);

    const enviarFormulario = (e) => {
        e.preventDefault();

        if (!arquivo) {
            alert('Selecione o arquivo do exame.');
            return;
        }

        salvar({
            nome_exame: nomeExame,
            data_exame: dataExame,
            arquivo: arquivo
        });
    };

    return (
        <div className={style.overlay}>

            <div className={style.modal}>

                <div className={style.cabecalho}>
                    <div>
                        <h2>Adicionar exame</h2>
                        <p>Envie seu exame laboratorial para análise.</p>
                    </div>

                    <button
                        type="button"
                        className={style.fechar}
                        onClick={fechar}
                    >
                        <FaTimes />
                    </button>
                </div>

                <form onSubmit={enviarFormulario}>

                    <div className={style.campo}>
                        <label htmlFor="nomeExame">Nome do exame</label>

                        <input
                            type="text"
                            id="nomeExame"
                            placeholder="Ex: Hemograma completo"
                            value={nomeExame}
                            onChange={(e) => setNomeExame(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label htmlFor="dataExame">Data de realização</label>

                        <input
                            type="date"
                            id="dataExame"
                            value={dataExame}
                            onChange={(e) => setDataExame(e.target.value)}
                        />
                    </div>

                    <div className={style.campo}>
                        <label>Arquivo do exame</label>

                        <label htmlFor="arquivo" className={style.areaUpload}>
                            <FaCloudUploadAlt />

                            <strong>
                                {arquivo ? arquivo.name : 'Selecione seu arquivo'}
                            </strong>

                            <span>Imagem JPG ou PNG (máximo 10 MB)</span>
                        </label>

                        <input
                            type="file"
                            id="arquivo"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setArquivo(e.target.files[0] || null)}
                            hidden
                        />
                    </div>

                    <div className={style.aviso}>
                        <FaFileMedical />
                        <p>
                            Após o envio, o sistema tentará reconhecer os
                            resultados. Você poderá revisar as informações
                            antes de salvá-las.
                        </p>
                    </div>

                    <div className={style.acoes}>
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
                            Enviar exame
                        </button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export { AdicionarExame };
