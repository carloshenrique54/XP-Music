import "../styles/Generos.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { buscarMusicasPorGenero, GENEROS_INDIE } from "../services/deezer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGuitar, faMusic, faLeaf, faCloud, faWaveSquare, faBolt, faCompactDisc, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import MusicCard from "../components/MusicCard"
import supabase from "../services/supabase"

const ICONES_MAP = {
    'guitar': faGuitar,
    'music': faMusic,
    'leaf': faLeaf,
    'cloud': faCloud,
    'wave-square': faWaveSquare,
    'bolt': faBolt,
    'compact-disc': faCompactDisc,
}

function Generos() {
    const [generoSelecionado, setGeneroSelecionado] = useState(null)
    const [musicas, setMusicas] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [favoritos, setFavoritos] = useState([])
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario"))
        if (!u) { navigate("/"); return }
        setUsuario(u)
        carregarFavoritos(u.id)
    }, [])

    async function carregarFavoritos(userId) {
        const { data } = await supabase
            .from("favoritos")
            .select("*")
            .eq("usuario_id", userId)
        setFavoritos(data || [])
    }

    async function selecionarGenero(genero) {
        setGeneroSelecionado(genero)
        setCarregando(true)
        const data = await buscarMusicasPorGenero(genero.query)
        setMusicas(data)
        setCarregando(false)
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

    function voltar() {
        setGeneroSelecionado(null)
        setMusicas([])
    }

    return (
        <main className="generosPage">
            {!generoSelecionado ? (
                <>
                    <div className="generosHeader">
                        <h1><FontAwesomeIcon icon={faMusic} /> Generos</h1>
                        <p>Escolha um genero e descubra novas musicas</p>
                    </div>
                    <div className="generosGrid">
                        {GENEROS_INDIE.map(g => (
                            <div
                                key={g.id}
                                className="generoCard"
                                style={{ '--genero-cor': g.cor }}
                                onClick={() => selecionarGenero(g)}
                            >
                                <div className="generoCardIcon">
                                    <FontAwesomeIcon icon={ICONES_MAP[g.icone] || faMusic} />
                                </div>
                                <h3>{g.nome}</h3>
                                <div className="generoCardGlow"></div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className="generosHeader">
                        <button className="voltarBtn" onClick={voltar}>
                            <FontAwesomeIcon icon={faArrowLeft} /> Voltar
                        </button>
                        <h1 style={{ color: generoSelecionado.cor }}>
                            <FontAwesomeIcon icon={ICONES_MAP[generoSelecionado.icone] || faMusic} />
                            {' '}{generoSelecionado.nome}
                        </h1>
                        <p>{musicas.length} musicas encontradas</p>
                    </div>
                    <div className="generosConteudo">
                        {carregando ? (
                            <div className="explorarLoading">
                                <div className="spinner"></div>
                                <p>Carregando...</p>
                            </div>
                        ) : (
                            <div className="musicGridGeneros">
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
                </>
            )}
        </main>
    )
}

export default Generos
