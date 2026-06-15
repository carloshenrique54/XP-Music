import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faForward, faBackward, faVolumeHigh, faVolumeLow, faVolumeXmark, faMusic } from "@fortawesome/free-solid-svg-icons"
import { usePlayer } from "../contexts/PlayerContext"
import "../styles/Player.css"

function Player() {
    const {
        musicaAtual,
        tocando,
        progresso,
        duracao,
        volume,
        setVolume,
        togglePlay,
        proximaMusica,
        musicaAnterior,
        buscarTempo,
    } = usePlayer()

    function formatarTempo(seg) {
        if (!seg || isNaN(seg)) return "0:00"
        const m = Math.floor(seg / 60)
        const s = Math.floor(seg % 60)
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const porcentagem = duracao ? (progresso / duracao) * 100 : 0

    function iconeVolume() {
        if (volume === 0) return faVolumeXmark
        if (volume < 0.5) return faVolumeLow
        return faVolumeHigh
    }

    const estaAtivo = !!musicaAtual

    return (
        <div className={`playerBar ${estaAtivo ? 'playerBar-ativa' : 'playerBar-vazia'}`}>
            <div className="playerInfo">
                {estaAtivo ? (
                    <>
                        <img
                            src={musicaAtual.album?.cover_medium || musicaAtual.album?.cover}
                            alt={musicaAtual.title}
                            className="playerCapa"
                        />
                        <div className="playerTexto">
                            <span className="playerTitulo">{musicaAtual.title_short || musicaAtual.title}</span>
                            <span className="playerArtista">{musicaAtual.artist?.name}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="playerCapa playerCapaPlaceholder">
                            <FontAwesomeIcon icon={faMusic} />
                        </div>
                        <div className="playerTexto">
                            <span className="playerTitulo">Nenhuma música tocando</span>
                            <span className="playerArtista">XP Music</span>
                        </div>
                    </>
                )}
            </div>

            <div className="playerControles">
                <div className="playerBotoes">
                    <button className="playerBtn" onClick={estaAtivo ? musicaAnterior : undefined} disabled={!estaAtivo}>
                        <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className="playerBtnPlay" onClick={estaAtivo ? togglePlay : undefined} disabled={!estaAtivo}>
                        <FontAwesomeIcon icon={estaAtivo && tocando ? faPause : faPlay} />
                    </button>
                    <button className="playerBtn" onClick={estaAtivo ? proximaMusica : undefined} disabled={!estaAtivo}>
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                <div className="playerProgresso">
                    <span className="playerTempo">{formatarTempo(estaAtivo ? progresso : 0)}</span>
                    <div className={`playerBarraContainer ${!estaAtivo ? 'disabled' : ''}`} onClick={(e) => {
                        if (!estaAtivo) return
                        const rect = e.currentTarget.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const pct = x / rect.width
                        buscarTempo(pct * duracao)
                    }}>
                        <div className="playerBarra">
                            <div className="playerBarraPreenchida" style={{ width: `${estaAtivo ? porcentagem : 0}%` }}></div>
                            <div className="playerBarraDot" style={{ left: `${estaAtivo ? porcentagem : 0}%` }}></div>
                        </div>
                    </div>
                    <span className="playerTempo">{formatarTempo(estaAtivo ? duracao : 0)}</span>
                </div>
            </div>

            <div className="playerVolume">
                <FontAwesomeIcon icon={iconeVolume()} className="playerVolumeIcon" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="playerVolumeSlider"
                    disabled={!estaAtivo}
                />
            </div>
        </div>
    )
}

export default Player
