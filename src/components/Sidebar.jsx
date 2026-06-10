import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faCompass, faHeart, faUser, faSignOutAlt, faMusic } from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../styles/Sidebar.css"

function SideBar(){
    const location = useLocation()
    const navigate = useNavigate()

    const links = [
        { to: "/inicio", icon: faHome, label: "Inicio" },
        { to: "/explorar", icon: faCompass, label: "Explorar" },
        { to: "/generos", icon: faMusic, label: "Generos" },
        { to: "/favoritos", icon: faHeart, label: "Favoritos" },
        { to: "/perfil", icon: faUser, label: "Perfil" },
    ]

    function sair() {
        localStorage.removeItem("usuario")
        navigate("/")
    }

    return(
        <aside className="sidebar">
            <div className="sidebarLogo">
                <h1>XP</h1>
                <span>MUSIC</span>
            </div>
            <nav className="sidebarNav">
                <ul>
                    {links.map(link => (
                        <li key={link.to}>
                            <Link
                                className={`linksSidebar ${location.pathname === link.to ? 'ativo' : ''}`}
                                to={link.to}
                            >
                                <FontAwesomeIcon icon={link.icon} />
                                <span>{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebarBottom">
                <button className="btnSair" onClick={sair}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    )
}

export default SideBar