import { useState } from 'react';
import { FaTimes, FaFileMedical, FaInfoCircle } from 'react-icons/fa';

import style from './RevisarExame.module.css';

const RevisarExame = ({ exame, fechar, confirmar }) => {

    const [textoExtraido, setTextoExtraido] = useState(exame?.texto_extraido || '');

    return (
        <div className={style.overlay}>

            <div className={style.modal}>

                <div className={style.cabecalho}>
                    <div>
                        <h2>Revisar exame</h2>
                        <p>Confira o texto reconhecido pelo sistema.</p>
                    </div>

                    <button onClick={fechar} type="button">
                        <FaTimes />
                    </button>
                </div>

                <div className={style.aviso}>
                    <FaInfoCircle />
                    <p>
                        O reconhecimento automático pode conter erros.
                        Confira os dados com o documento original antes de confirmar.
                    </p>
                </div>

                <div className={style.arquivo}>
                    <FaFileMedical />
                    <span>{exame?.nome_exame || 'Exame laboratorial'}</span>
                </div>

                <div className={style.campo}>
                    <label htmlFor="textoExtraido">Texto reconhecido</label>

                    <textarea
                        id="textoExtraido"
                        value={textoExtraido}
                        onChange={(e) => setTextoExtraido(e.target.value)}
                        rows={12}
                    />
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
                        type="button"
                        className={style.botaoSalvar}
                        onClick={() => confirmar(textoExtraido)}
                    >
                        Confirmar revisão
                    </button>
                </div>

            </div>

        </div>
    );
};

export { RevisarExame };
