import styles from './MenuLateral.module.css';

import {
  FaBars,
  FaHome,
  FaSyringe,
  FaCalendarCheck,
  FaPills,
  FaHospital,
  FaNewspaper,
  FaFileMedical,
  FaPaw,
  FaSignOutAlt
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';

const MenuLateral = () => {

  const navigate = useNavigate();

  const sair = () => {

    // futuramente:
    // localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <aside className={styles.menu}>

      <div className={styles.topo}>
        <FaBars />
      </div>

      <nav>

        <Link
          to="/dashboard"
          className={styles.item}
        >
          <FaHome />
          <span>Início</span>
        </Link>

       {/* <Link
          to="/vacinacao"
          className={styles.item}
        >
          <FaSyringe />
          <span>Carteira de Vacinação</span>
        </Link>

        <Link
          to="/consultas"
          className={styles.item}
        >
          <FaCalendarCheck />
          <span>Consultas</span>
        </Link>

        <Link
          to="/medicamentos"
          className={styles.item}
        >
          <FaPills />
          <span>Medicamentos</span>
        </Link>

        <Link
          to="/hospitais"
          className={styles.item}
        >
          <FaHospital />
          <span>Localizar Hospitais</span>
        </Link>

        <Link
          to="/noticias"
          className={styles.item}
        >
          <FaNewspaper />
          <span>Notícias</span>
        </Link>

        <Link
          to="/exames"
          className={styles.item}
        >
          <FaFileMedical />
          <span>Exames</span>
        </Link>

        <Link
          to="/pets"
          className={styles.item}
        >
          <FaPaw />
          <span>Pets</span>
        </Link>*/}

      </nav>

      <button
        onClick={sair}
        className={styles.sair}
      >
        <FaSignOutAlt />
        <span>Sair</span>
      </button>

    </aside>
  );
};

export { MenuLateral };