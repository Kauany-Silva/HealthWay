import styles from "./Recursos.module.css";

const recursos = [
  {
    titulo: "Carteira Digital",
    descricao: "Guarde suas vacinas em um só lugar."
  },
  {
    titulo: "Localizar Hospitais",
    descricao: "Encontre, rapidamente, os hospitais mais próximos e acompanhe o tempo estimado de espera para um atendimento ágil."
  },
  {
    titulo: "Consultas",
    descricao: "Acompanhe agendamentos passados e futuros."
  },
  {
    titulo: "Medicamentos",
    descricao: "Controle seus medicamentos de forma prática e segura, com lembretes, horários e funcionalidades."
  },
  {
    titulo: "Cuidado com Seu Pet",
    descricao: "Organize vacinas e medicamentos do seu animal de estimação em um só lugar, garantindo saúde e bem-estar para ele também."
  },
  {
    titulo: "Notícias",
    descricao: "Acompanhe de perto as notícias atuais do mundo da saúde."
  },
  {
    titulo: "Exames",
    descricao: "Anexe seus exames e receba infográficos simples, práticos e com dicas para melhorar a sua saúde."
  }
];

const Recursos = () => {
  return (
    <section className={styles.container}>
      <h2>Recursos da <span className={styles.NomeSite}>Health Way</span></h2>

      <div className={styles.slider}>
        <div className={styles.track}>
          {[...recursos, ...recursos].map((item, index) => (
            <div className={styles.card} key={index}>
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export {Recursos};