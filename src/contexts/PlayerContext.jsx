import { createContext, useContext, useState, useRef, useEffect } from 'react'

const PlayerContext = createContext()

export function PlayerProvider({ children }) {
  const [musicaAtual, setMusicaAtual] = useState(null)
  const [tocando, setTocando] = useState(false)
  const [progresso, setProgresso] = useState(0)
  const [duracao, setDuracao] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [fila, setFila] = useState([])
  const [indiceAtual, setIndiceAtual] = useState(0)
  const audioRef = useRef(new Audio())

  useEffect(() => {
    const audio = audioRef.current
    audio.volume = volume

    const atualizarProgresso = () => setProgresso(audio.currentTime)
    const atualizarDuracao = () => setDuracao(audio.duration)
    const aoTerminar = () => proximaMusica()

    audio.addEventListener('timeupdate', atualizarProgresso)
    audio.addEventListener('loadedmetadata', atualizarDuracao)
    audio.addEventListener('ended', aoTerminar)

    return () => {
      audio.removeEventListener('timeupdate', atualizarProgresso)
      audio.removeEventListener('loadedmetadata', atualizarDuracao)
      audio.removeEventListener('ended', aoTerminar)
    }
  }, [])

  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  function tocarMusica(musica, listaMusicas = []) {
    if (!musica?.preview) return

    const audio = audioRef.current
    audio.src = musica.preview
    audio.play()
    setMusicaAtual(musica)
    setTocando(true)

    if (listaMusicas.length > 0) {
      setFila(listaMusicas)
      const idx = listaMusicas.findIndex(m => m.id === musica.id)
      setIndiceAtual(idx >= 0 ? idx : 0)
    }
  }

  function togglePlay() {
    const audio = audioRef.current
    if (tocando) {
      audio.pause()
    } else {
      audio.play()
    }
    setTocando(!tocando)
  }

  function proximaMusica() {
    if (fila.length === 0) return
    const novoIndice = (indiceAtual + 1) % fila.length
    setIndiceAtual(novoIndice)
    tocarMusica(fila[novoIndice], fila)
  }

  function musicaAnterior() {
    if (fila.length === 0) return
    const novoIndice = indiceAtual === 0 ? fila.length - 1 : indiceAtual - 1
    setIndiceAtual(novoIndice)
    tocarMusica(fila[novoIndice], fila)
  }

  function buscarTempo(tempo) {
    audioRef.current.currentTime = tempo
    setProgresso(tempo)
  }

  return (
    <PlayerContext.Provider value={{
      musicaAtual,
      tocando,
      progresso,
      duracao,
      volume,
      setVolume,
      tocarMusica,
      togglePlay,
      proximaMusica,
      musicaAnterior,
      buscarTempo,
      fila,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}
