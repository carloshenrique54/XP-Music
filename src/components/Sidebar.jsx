import "../styles/Sidebar.css"
import { Link } from "react-router-dom"

function SideBar(){
    return(
        <aside>
            <h1>XP</h1>
            <ul>
                <li><Link className="linksSidebar">Home</Link></li>
                <li><Link className="linksSidebar">Explorar</Link></li>
                <li><Link className="linksSidebar">Biblioteca</Link></li>
            </ul>
        </aside>
    )       
}

export default SideBar