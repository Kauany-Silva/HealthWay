import { Routes, Route } from 'react-router-dom';
import { RotasPrivadas } from './RotasPrivadas';

// Páginas públicas
import { Landing } from '../Paginas/Landing';
import { CadastroPage, LoginPage } from '../Paginas/Autenticacao'

// Páginas privadas (Dashboard e rotas filhas)
import { Dashboard } from '../Paginas/Dashboard';
import { CarteiraVacinacao } from '../Paginas/CarteiraVacinacao';
/* 
import { Pets } from '../../Pages/Pets';
import { LocalHospital } from '../../Pages/LocalHospital';
import { Consultas } from '../../Pages/Consultas';
import { Medicamentos } from '../../Pages/Medicamentos';

import { NotFound } from '../../Pages/NotFound/NotFound';
import { Noticias } from '../../Pages/Noticias/Noticias';
*/



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
        {/*
        <Route path="hospitais" element={<LocalHospital />} />
        <Route path="consultas" element={<Consultas />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="pets" element={<Pets />} />
        <Route path="noticias" element={<Noticias />} /> */}
       </Route>
      </Route>


       <Route path="*" element={<NotFound />} />

    </Routes>
    
  );
};

export { Rotas };