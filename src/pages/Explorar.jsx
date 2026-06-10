import "../styles/Explorar.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { buscarMusicas, buscarMusicasPorGenero } from "../services/deezer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCompactDisc } from "@fortawesome/free-solid-svg-icons"
import MusicCard from "../components/MusicCard"
import supabase from "../services/supabase"

const CATEGORIAS = [
    { label: "Tudo", query: "indie" },
    { label: "Indie Rock", query: "indie rock" },
    { label: "Indie Pop", query: "indie pop" },
    { label: "Indie Folk", query: "indie folk" },
    { label: "Dream Pop", query: "dream pop" },
    { label: "Shoegaze", query: "shoegaze" },
    { label: "Post-Punk", query: "post punk" },
    { label: "Lo-Fi", query: "lo-fi indie" },
]

function Explorar() {
    const [pesquisa, setPesquisa] = useState("")
    const [musicas, setMusicas] = useState([])
    const [categoriaAtiva, setCategoriaAtiva] = useState("Tudo")
    const [carregando, setCarregando] = useState(true)
    const [favoritos, setFavoritos] = useState([])
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario"))
        if (!u) { navigate("/"); return }
        setUsuario(u)
        carregarMusicas("indie")
        carregarFavoritos(u.id)
    }, [])

    async function carregarMusicas(query) {
        setCarregando(true)
        const data = await buscarMusicasPorGenero(query)
        setMusicas(data)
        setCarregando(false)
    }

    async function carregarFavoritos(userId) {
        const { data } = await supabase
            .from("favoritos")
            .select("*")
            .eq("usuario_id", userId)
        setFavoritos(data || [])
    }

    async function pesquisar(e) {
        e.preventDefault()
        if (!pesquisa.trim()) return
        setCarregando(true)
        setCategoriaAtiva("")
        const data = await buscarMusicas(pesquisa)
        setMusicas(data)
        setCarregando(false)
    }

    function selecionarCategoria(cat) {
        setCategoriaAtiva(cat.label)
        setPesquisa("")
        carregarMusicas(cat.query)
    }

    async function toggleFavorito(musica) {
        if (!usuario) return
        const existe = favoritos.find(f => f.track_id === musica.id)

        if (existe) {
            await supabase.from("favoritos").delete().eq("id", existe.id)
            setFavoritos(favoritos.filter(f => f.id !== existe.id))
        } else {
            const novo = {
                usuario_id: usuario.id,
                track_id: musica.id,
                titulo: musica.title_short || musica.title,
                artista: musica.artist?.name,
                capa: musica.album?.cover_medium || musica.album?.cover,
                preview_url: musica.preview,
            }
            const { data } = await supabase.from("favoritos").insert([novo]).select()
            if (data) setFavoritos([...favoritos, data[0]])
        }
    }

    return (
        <main className="explorarPage">
            <div className="explorarHeader">
                <h1><FontAwesomeIcon icon={faCompactDisc} className="explorarTitleIcon" /> Explorar</h1>
                <form className="explorarPesquisa" onSubmit={pesquisar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        placeholder="Buscar musicas..."
                        value={pesquisa}
                        onChange={e => setPesquisa(e.target.value)}
                    />
                </form>
            </div>

            <div className="explorarCategorias">
                {CATEGORIAS.map(cat => (
                    <button
                        key={cat.label}
                        className={`categoriaBtn ${categoriaAtiva === cat.label ? 'categoriaBtnAtivo' : ''}`}
                        onClick={() => selecionarCategoria(cat)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="explorarConteudo">
                {carregando ? (
                    <div className="explorarLoading">
                        <div className="spinner"></div>
                        <p>Carregando musicas...</p>
                    </div>
                ) : musicas.length === 0 ? (
                    <div className="explorarVazio">
                        <p>Nenhuma musica encontrada</p>
                    </div>
                ) : (
                    <div className="musicGridExplorar">
                        {musicas.map(m => (
                            <MusicCard
                                key={m.id}
                                musica={m}
                                listaMusicas={musicas}
                                favoritos={favoritos}
                                onToggleFavorito={toggleFavorito}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Explorar
