import { Routes, Route } from 'react-router-dom';

// Páginas públicas
import { Landing } from '../Paginas/Landing';
import { CadastroPage } from '../Paginas/Autenticacao'
import { LoginPage } from '../Paginas/Autenticacao'

// Páginas privadas
import { Dashboard } from '../Paginas/Dashboard';



const Rotas = () => {
  return (

    <Routes>  

        {/* Rotas públicas */}  
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas privadas */} 
        
        <Route path="/dashboard" element={<Dashboard/>}>

        {/* ROTAS FUTURAS
         <Route path="vacinacao" element={<CarteiraVacinacao />} />
        <Route path="hospitais" element={<LocalHospital />} />
        <Route path="consultas" element={<Consultas />} />
        <Route path="medicamentos" element={<Medicamentos />} />
        <Route path="pets" element={<Pets />} />
        <Route path="noticias" element={<Noticias />} />*/}
        
       </Route>

    </Routes>
    
  );
};

export { Rotas };