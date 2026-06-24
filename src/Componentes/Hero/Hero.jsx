import style from "./Hero.module.css";
import videoHero from "../../Assets/Videos/hero.mp4";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={style.hero}>
      <video autoPlay loop muted playsInline className={style.VideoFundo}>
        <source src={videoHero} type="video/mp4" />
      </video>

      <div className={style.conteudo}>
        <h1 className={style.titulo}>Health Way</h1>

        <h2 className={style.slogan}>
          <TypeAnimation
            sequence={[
              "Caminhando pelo seu bem-estar",
              1500,
              "",
              500,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h2>

        <Link to="/cadastro" className={style.botao}>
          Comece Agora
        </Link>

      </div>
    </section>
  );
};

export { Hero };