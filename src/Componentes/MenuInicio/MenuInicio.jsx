import style from './MenuInicio.module.css';
import '../../Paginas/Landing';

const MenuInicio = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={style.menu}>
      <ul className={style.menuLista}>
        <li onClick={() => scrollToSection('inicio')}>Início</li>
        <li onClick={() => scrollToSection('sobre')}>Sobre Nós</li>
        <li onClick={() => scrollToSection('recursos')}>Recursos</li>
        <li onClick={() => scrollToSection('contato')}>Contato</li>
      </ul>
    </nav>
  );
};

export { MenuInicio };