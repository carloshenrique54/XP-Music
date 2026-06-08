import './styles/App.css'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

//Pages
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RedefinirSenha from './pages/RedefinirSenha.jsx'
import Inicio from './pages/Inicio.jsx'
import SideBar from './components/Sidebar.jsx'

function App() {
  const location = useLocation();
  const semSidebar = ["/", "/cadastro", "/redefinirsenha"];

  const mostrarSidebar = !semSidebar.includes(location.pathname);
  return (
    <>
      {mostrarSidebar && <SideBar />}

      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/redefinirsenha" element={<RedefinirSenha />}/>
        <Route path="/inicio" element={<Inicio />}/>
      </Routes>
    </>
  )
}

export default App
