import { useState } from 'react';
import styles from './Carteira.module.css';

import { AdicionarVacina } from '../AdicionarVacina/AdicionarVacina';

const Carteira = () => {
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <div className={styles.container}>
            <h1>Minha Carteira de Vacinação</h1>
            <div className={styles.carteira}>
                <h2> Health Way</h2>
                <div className={styles.botao}>
                    <button onClick={() => setModalAberto(true)}>
                        Adicionar Vacina
                    </button>
                </div>
            </div>
        {modalAberto && (<AdicionarVacina fechar={() => setModalAberto(false)}/>)}
        </div>
    )
}

export {Carteira};