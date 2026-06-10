import "../styles/Favoritos.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons"
import { usePlayer } from "../contexts/PlayerContext"
import supabase from "../services/supabase"

function Favoritos() {
    const [favoritos, setFavoritos] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState(null)
    const { tocarMusica, musicaAtual } = usePlayer()
    const navigate = useNavigate()

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario"))
        if (!u) { navigate("/"); return }
        setUsuario(u)
        carregarFavoritos(u.id)
    }, [])

    async function carregarFavoritos(userId) {
        setCarregando(true)
        const { data } = await supabase
            .from("favoritos")
            .select("*")
            .eq("usuario_id", userId)
            .order("created_at", { ascending: false })
        setFavoritos(data || [])
        setCarregando(false)
    }

    async function removerFavorito(fav) {
        await supabase.from("favoritos").delete().eq("id", fav.id)
        setFavoritos(favoritos.filter(f => f.id !== fav.id))
    }

    function tocarFavorito(fav) {
        const musica = {
            id: fav.track_id,
            title: fav.titulo,
            title_short: fav.titulo,
            preview: fav.preview_url,
            artist: { name: fav.artista },
            album: { cover_medium: fav.capa, cover: fav.capa },
        }
        const listaMusicas = favoritos.map(f => ({
            id: f.track_id,
            title: f.titulo,
            title_short: f.titulo,
            preview: f.preview_url,
            artist: { name: f.artista },
            album: { cover_medium: f.capa, cover: f.capa },
        }))
        tocarMusica(musica, listaMusicas)
    }

    return (
        <main className="favoritosPage">
            <div className="favoritosHeader">
                <div className="favoritosHeaderIcon">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                    <h1>Meus Favoritos</h1>
                    <p>{favoritos.length} {favoritos.length === 1 ? 'musica salva' : 'musicas salvas'}</p>
                </div>
            </div>

            <div className="favoritosConteudo">
                {carregando ? (
                    <div className="explorarLoading">
                        <div className="spinner"></div>
                        <p>Carregando favoritos...</p>
                    </div>
                ) : favoritos.length === 0 ? (
                    <div className="favoritosVazio">
                        <FontAwesomeIcon icon={faHeart} className="favoritosVazioIcon" />
                        <h2>Nenhum favorito ainda</h2>
                        <p>Explore musicas e adicione aos seus favoritos</p>
                    </div>
                ) : (
                    <div className="favoritosLista">
                        <div className="favoritosListaHeader">
                            <span className="favColNum">#</span>
                            <span className="favColTitulo">Titulo</span>
                            <span className="favColArtista">Artista</span>
                            <span className="favColAcoes">Acoes</span>
                        </div>
                        {favoritos.map((fav, index) => (
                            <div
                                key={fav.id}
                                className={`favoritoItem ${musicaAtual?.id === fav.track_id ? 'favoritoItemAtivo' : ''}`}
                            >
                                <span className="favColNum">{index + 1}</span>
                                <div className="favoritoInfo">
                                    <img src={fav.capa} alt={fav.titulo} className="favoritoCapa" />
                                    <span className="favoritoTitulo">{fav.titulo}</span>
                                </div>
                                <span className="favColArtista">{fav.artista}</span>
                                <div className="favColAcoes">
                                    <button className="favBtnPlay" onClick={() => tocarFavorito(fav)}>
                                        <FontAwesomeIcon icon={faPlay} />
                                    </button>
                                    <button className="favBtnRemover" onClick={() => removerFavorito(fav)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Favoritos
