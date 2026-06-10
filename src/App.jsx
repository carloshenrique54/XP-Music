import './styles/App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { PlayerProvider } from './contexts/PlayerContext'

import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import RedefinirSenha from './pages/RedefinirSenha.jsx'
import Inicio from './pages/Inicio.jsx'
import Explorar from './pages/Explorar.jsx'
import Generos from './pages/Generos.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Perfil from './pages/Perfil.jsx'

import SideBar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'

function App() {
  const location = useLocation();
  const semSidebar = ["/", "/cadastro", "/redefinirsenha"];
  const mostrarSidebar = !semSidebar.includes(location.pathname);

  return (
    <PlayerProvider>
      <div className="appLayout">
        {mostrarSidebar && <SideBar />}
        <div className={`appConteudo ${mostrarSidebar ? 'comSidebar' : ''}`}>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/cadastro" element={<Cadastro />}/>
            <Route path="/redefinirsenha" element={<RedefinirSenha />}/>
            <Route path="/inicio" element={<Inicio />}/>
            <Route path="/explorar" element={<Explorar />}/>
            <Route path="/generos" element={<Generos />}/>
            <Route path="/favoritos" element={<Favoritos />}/>
            <Route path="/perfil" element={<Perfil />}/>
          </Routes>
        </div>
        {mostrarSidebar && <Player />}
      </div>
    </PlayerProvider>
  )
}

export default App