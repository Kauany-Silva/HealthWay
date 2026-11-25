
import { useState, useEffect } from 'react';

import style from './Exames.module.css';

const Exames = () => {

    const [exames, setExames] = useState([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [exameSelecionado, setExameSelecionado] = useState(null);

    return (
        <main className={style.container}>

        </main>
    );
};

export default Exames;
