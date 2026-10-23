
import { useState } from 'react';
import styles from './Carteira.module.css';

import { AdicionarVacina } from '../AdicionarVacina/AdicionarVacina';
import { CardVacina } from '../CardVacina/CardVacina';

const Carteira = () => {
    const [modalAberto, setModalAberto] = useState(false);
    const [vacinas, setVacinas] = useState([]);

    const adicionarVacina = (novaVacina) => {
        setVacinas((listaAtual) => [...listaAtual, novaVacina]);
        setModalAberto(false);
    };

    return (
        <div className={styles.container}>
            <h1>Minha Carteira de Vacinação</h1>

            <div className={styles.carteira}>
                <h2>Health Way</h2>

             <div className={styles.listaVacinas}>
                {vacinas.map((vacina, index) => ( <CardVacina key={`${vacina.nome}-${vacina.data}-${index}`}
                vacina={vacina} />
    ))}
        </div>

                <div className={styles.botao}>
                    <button onClick={() => setModalAberto(true)}>
                        Adicionar Vacina
                    </button>
                </div>
            </div>

            {modalAberto && (
                <AdicionarVacina
                    fechar={() => setModalAberto(false)}
                    salvar={adicionarVacina}
                />
            )}
        </div>
    );
};

export { Carteira };
