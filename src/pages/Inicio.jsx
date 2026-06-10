import "../styles/Inicio.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPlay, faFire, faStar, faBolt } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { buscarMusicas, buscarMusicasPorGenero } from "../services/deezer"
import { usePlayer } from "../contexts/PlayerContext"
import MusicCard from "../components/MusicCard"
import supabase from "../services/supabase"
import bannerImg from "../assets/images/banner_indie.png"

function Inicio(){
    const [usuario, setUsuario] = useState(null)
    const [pesquisa, setPesquisa] = useState("")
    const [resultados, setResultados] = useState([])
    const [indieRock, setIndieRock] = useState([])
    const [indiePop, setIndiePop] = useState([])
    const [dreamPop, setDreamPop] = useState([])
    const [favoritos, setFavoritos] = useState([])
    const { tocarMusica } = usePlayer()
    const navigate = useNavigate()

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario"))
        if (!u) { navigate("/"); return }
        setUsuario(u)
        carregarMusicas()
        carregarFavoritos(u.id)
    }, [])

    async function carregarMusicas() {
        const [rock, pop, dream] = await Promise.all([
            buscarMusicasPorGenero("indie rock"),
            buscarMusicasPorGenero("indie pop"),
            buscarMusicasPorGenero("dream pop"),
        ])
        setIndieRock(rock)
        setIndiePop(pop)
        setDreamPop(dream)
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
        const data = await buscarMusicas(pesquisa)
        setResultados(data)
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

    const primeiroNome = usuario?.nome?.split(" ")[0] || "Usuario"

    return(
        <main className="inicioPage">
            <div className="inicioTopPage">
                <form className="inputPesquisa" onSubmit={pesquisar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        placeholder="Buscar musicas, artistas..."
                        value={pesquisa}
                        onChange={e => setPesquisa(e.target.value)}
                    />
                </form>
                <div className="perfilInicioTop">
                    <div className="perfilAvatar">{primeiroNome[0]}</div>
                    <h2>{primeiroNome}</h2>
                </div>
            </div>

            <div className="inicioConteudo">
                <div className="bannerPrincipal">
                    <img src={bannerImg} alt="XP Music Banner" className="bannerImg" />
                    <div className="bannerOverlay">
                        <div className="bannerTexto">
                            <span className="bannerTag">PLATAFORMA INDIE</span>
                            <h1>XP MUSIC</h1>
                            <p>Descubra o melhor da musica independente. Indie Rock, Dream Pop, Lo-Fi e muito mais.</p>
                            <button className="bannerBtn" onClick={() => navigate("/explorar")}>
                                <FontAwesomeIcon icon={faPlay} />
                                Explorar agora
                            </button>
                        </div>
                    </div>
                </div>

                {resultados.length > 0 && (
                    <section className="secaoMusicas">
                        <div className="secaoHeader">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="secaoIcon" />
                            <h2>Resultados da busca</h2>
                        </div>
                        <div className="musicGrid">
                            {resultados.map(m => (
                                <MusicCard
                                    key={m.id}
                                    musica={m}
                                    listaMusicas={resultados}
                                    favoritos={favoritos}
                                    onToggleFavorito={toggleFavorito}
                                />
                            ))}
                        </div>
                    </section>
                )}

                <section className="secaoMusicas">
                    <div className="secaoHeader">
                        <FontAwesomeIcon icon={faFire} className="secaoIcon" />
                        <h2>Indie Rock</h2>
                    </div>
                    <div className="musicScroll">
                        {indieRock.map(m => (
                            <MusicCard
                                key={m.id}
                                musica={m}
                                listaMusicas={indieRock}
                                favoritos={favoritos}
                                onToggleFavorito={toggleFavorito}
                            />
                        ))}
                    </div>
                </section>

                <section className="secaoMusicas">
                    <div className="secaoHeader">
                        <FontAwesomeIcon icon={faStar} className="secaoIcon" />
                        <h2>Indie Pop</h2>
                    </div>
                    <div className="musicScroll">
                        {indiePop.map(m => (
                            <MusicCard
                                key={m.id}
                                musica={m}
                                listaMusicas={indiePop}
                                favoritos={favoritos}
                                onToggleFavorito={toggleFavorito}
                            />
                        ))}
                    </div>
                </section>

                <section className="secaoMusicas">
                    <div className="secaoHeader">
                        <FontAwesomeIcon icon={faBolt} className="secaoIcon" />
                        <h2>Dream Pop</h2>
                    </div>
                    <div className="musicScroll">
                        {dreamPop.map(m => (
                            <MusicCard
                                key={m.id}
                                musica={m}
                                listaMusicas={dreamPop}
                                favoritos={favoritos}
                                onToggleFavorito={toggleFavorito}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Inicio