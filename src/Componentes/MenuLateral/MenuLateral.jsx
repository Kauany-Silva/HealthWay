
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
import { useAuth } from '../../Context/AuthContext';

const MenuLateral = () => {

    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();

    const sair = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem('usuario');

        navigate('/login', { replace: true });
    };

    return (
        <aside className={styles.menu}>

            <div className={styles.topo}>
                <FaBars />
            </div>

            <nav>

                <Link to="/dashboard" className={styles.item}>
                    <FaHome />
                    <span>Início</span>
                </Link>

                <Link to="/dashboard/vacinacao" className={styles.item}>
                    <FaSyringe />
                    <span>Carteira de Vacinação</span>
                </Link>

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
