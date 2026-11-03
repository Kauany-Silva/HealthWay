import styles from "./Recursos.module.css";
import { DadosRecursos } from '../../Dados/DadosRecursos';

const Recursos = ({ id }) => {
  return (
    <section id={id} className={styles.container}>
      <h2>Recursos da <span className={styles.NomeSite}>Health Way</span></h2>

      <div className={styles.slider}>
        <div className={styles.track}>
          {[...DadosRecursos, ...DadosRecursos].map((item, index) => {
            const IconeComponente = item.icone;

            return (
              <div className={styles.card} key={index}>
                {/* Agrupa Ícone e Título */}
                <div className={styles.headerCard}>
                  <div className={styles.iconContainer}> 
                    {IconeComponente && <IconeComponente size={22} />}
                  </div>
                  <h3>{item.titulo}</h3>
                </div>
                
                <p>{item.descricao}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export { Recursos };