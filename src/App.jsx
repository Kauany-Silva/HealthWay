import { BrowserRouter } from 'react-router-dom'
import { Rotas } from './Rotas'
import { PainelAcessibilidade } from './Componentes'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <PainelAcessibilidade/>
      <Rotas />
    </BrowserRouter>
  )
}

export { App }