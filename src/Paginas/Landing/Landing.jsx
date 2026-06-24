import {Cabecalho, MenuInicio, Hero, SobreNos, Recursos, Contato} from '../../Componentes'
import style from './Landing.module.css';

const Landing = () => {
  return (
    <div className={style.landing}>
      <Cabecalho />
      <MenuInicio/>      
      <Hero id="inicio" />
      <SobreNos id="sobre" />
      <Recursos id="recursos" />
      <Contato id="contato" /> {/*
      <Rodape /> */}
    </div>
  );
}

export {Landing};