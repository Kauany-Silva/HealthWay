import style from './Cabecalho.module.css';
import Logo from '../../Assets/Imagens/Logo.png';

const Cabecalho = () => {
  return (
    <header className={style.Cabecalho}>
        <img src={Logo} alt='Logo Health Way' /> 
      <h1>Health Way</h1>
    </header>
  );
};

export { Cabecalho };