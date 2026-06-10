import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"
import { usePlayer } from "../contexts/PlayerContext"
import "../styles/MusicCard.css"

function MusicCard({ musica, listaMusicas = [], favoritos = [], onToggleFavorito }) {
    const { tocarMusica, musicaAtual } = usePlayer()
    const isAtual = musicaAtual?.id === musica.id
    const isFavorito = favoritos.some(f => f.track_id === musica.id)

    return (
        <div className={`musicCard ${isAtual ? 'musicCardAtivo' : ''}`}>
            <div className="musicCardCapa" onClick={() => tocarMusica(musica, listaMusicas)}>
                <img
                    src={musica.album?.cover_medium || musica.album?.cover || '/favicon.svg'}
                    alt={musica.title}
                />
                <div className="musicCardOverlay">
                    <FontAwesomeIcon icon={faPlay} className="musicCardPlay" />
                </div>
            </div>
            <div className="musicCardInfo">
                <span className="musicCardTitulo" title={musica.title}>
                    {musica.title_short || musica.title}
                </span>
                <span className="musicCardArtista">{musica.artist?.name}</span>
            </div>
            {onToggleFavorito && (
                <button
                    className={`musicCardFav ${isFavorito ? 'favAtivo' : ''}`}
                    onClick={() => onToggleFavorito(musica)}
                >
                    <FontAwesomeIcon icon={isFavorito ? faHeartSolid : faHeartRegular} />
                </button>
            )}
        </div>
    )
}

export default MusicCard
