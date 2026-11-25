import { useState } from 'react';
import { CabecalhoExames, ResumoExames, AlertasExames, HistoricoExames, AdicionarExame, RevisarExame } from '../../Componentes';

import style from './Exames.module.css';

const Exames = () => {

    const [exames, setExames] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [exameSelecionado, setExameSelecionado] = useState(null);

    const [alertas, setAlertas] = useState([]);

    const abrirRevisao = (exame) => {
        setExameSelecionado(exame);
    };

    const confirmarRevisao = (texto) => {
        console.log('Texto revisado:', texto);
        setExameSelecionado(null);
    };

    const salvarExame = (dados) => {
        console.log('Dados do exame:', dados);
        setModalAberto(false);
    };

    return (
        <main className={style.container}>

            <CabecalhoExames
                abrirModal={() => setModalAberto(true)}
            />

            <ResumoExames
                totalExames={exames.length}
                totalIndicadores={0}
                resultadosAlterados={alertas.length}
            />

            <AlertasExames
                alertas={alertas}
                abrirAlertas={() => console.log('Exibir alertas')}
            />

            <HistoricoExames
                exames={exames}
                selecionarExame={abrirRevisao}
            />

            {modalAberto && (
                <AdicionarExame
                    fechar={() => setModalAberto(false)}
                    salvar={salvarExame}
                />
            )}

            {exameSelecionado && (
                <RevisarExame
                    exame={exameSelecionado}
                    fechar={() => setExameSelecionado(null)}
                    confirmar={confirmarRevisao}
                />
            )}

        </main>
    );
};

export { Exames };
