import {Login} from '../../Componentes'
import heroVideo from '../../Assets/Videos/hero.mp4'
import style from './Autenticacao.module.css';

const LoginPage = () => {
  return (
    <div className={style.container}>
      <section className={style.hero}>
        <video autoPlay loop muted playsInline className={style.videoBg}>
          <source src={heroVideo} type="video/mp4"/>
        </video>
      </section>

    <div /*className={style.Cadastro} */>
      <Login/>
    </div>
    </div>
  );
}

export {LoginPage};