import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Pages
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RedefinirSenha from './pages/RedefinirSenha.jsx'
import Inicio from './pages/Inicio.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/redefinirsenha" element={<RedefinirSenha />}/>
        <Route path="/inicio" element={<Inicio />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
