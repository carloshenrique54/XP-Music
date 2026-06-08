import './styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

//Pages
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RedefinirSenha from './pages/RedefinirSenha.jsx'

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/redefinirsenha" element={<RedefinirSenha />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
