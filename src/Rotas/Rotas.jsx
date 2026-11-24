
import { Routes, Route } from 'react-router-dom';
import { RotasPrivadas } from './RotasPrivadas';

// Páginas públicas
import { Landing } from '../Paginas/Landing';
import { CadastroPage, LoginPage } from '../Paginas/Autenticacao';

// Páginas privadas
import { Dashboard } from '../Paginas/Dashboard';
import { CarteiraVacinacao } from '../Paginas/CarteiraVacinacao';
import { Consultas } from '../Paginas/Consultas/Consultas';
import { Medicamentos } from '../Paginas/Medicamentos/Medicamentos';

const Rotas = () => {
    return (
        <Routes>

            {/* Rotas públicas */}
            <Route path="/" element={<Landing />} />
            <Route path="/cadastro" element={<CadastroPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Rotas privadas */}
            <Route element={<RotasPrivadas />}>

                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="vacinacao" element={<CarteiraVacinacao />} />
                    <Route path="consultas" element={<Consultas />} />
                    <Route path="medicamentos" element={<Medicamentos />} />
                </Route>

            </Route>

        </Routes>
    );
};

export { Rotas };
