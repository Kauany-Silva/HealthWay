import {Cadastro} from '../../Componentes'
import heroVideo from '../../Assets/Videos/hero.mp4'
import style from './Autenticacao.module.css';

const CadastroPage = () => {
  return (
    <div className={style.container}>
      <section className={style.hero}>
        <video autoPlay loop muted playsInline className={style.videoBg}>
          <source src={heroVideo} type="video/mp4"/>
        </video>
      </section>

    <div>
      <Cadastro/>
    </div>
    </div>
  );
}

export {CadastroPage};