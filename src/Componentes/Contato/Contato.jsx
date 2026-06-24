import styles from './Contato.module.css';
import Mascote from '../../Assets/Imagens/HelthinhoFeliz.png';

const Contato = () => {
  return (
    <section className={styles.contato}>
      <div className={styles.info}>

        <h2>Contato</h2>

        <p>
          Quer saber mais ou tem alguma dúvida?
          Preencha o formulário ao lado e
          responderemos o quanto antes.
        </p>

        <div className={styles.ilustracao}>
          <img
            src={Mascote}
            alt="Mascote Health Way"
          />

          <div className={styles.balao}>
            <p>healthway@gmail.com
                <br/>
            (12) 99211-8277</p>
          </div>
        </div>

      </div>

      <div className={styles.formulario}>
        <h2>Fale conosco!</h2>

        <form>

          <input
            type="text"
            placeholder="Nome"
          />

          <input
            type="email"
            placeholder="Email"
          />

          <textarea
            placeholder="Mensagem"
          ></textarea>

          <button type="submit">
            Enviar
          </button>

        </form>
      </div>
    </section>
  );
};

export {Contato};