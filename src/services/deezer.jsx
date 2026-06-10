const BASE = '/api/deezer'

export async function buscarMusicas(query) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}&limit=25`)
  const data = await res.json()
  return data.data || []
}

export async function buscarPorGenero(generoId) {
  const res = await fetch(`${BASE}/genre/${generoId}/artists`)
  const data = await res.json()
  return data.data || []
}

export async function buscarTopArtista(artistId) {
  const res = await fetch(`${BASE}/artist/${artistId}/top?limit=10`)
  const data = await res.json()
  return data.data || []
}

export async function buscarArtista(artistId) {
  const res = await fetch(`${BASE}/artist/${artistId}`)
  return await res.json()
}

export async function buscarAlbum(albumId) {
  const res = await fetch(`${BASE}/album/${albumId}`)
  return await res.json()
}

export async function buscarTrack(trackId) {
  const res = await fetch(`${BASE}/track/${trackId}`)
  return await res.json()
}

export async function buscarChart() {
  const res = await fetch(`${BASE}/chart/0/tracks?limit=20`)
  const data = await res.json()
  return data.data || []
}

export async function buscarPlaylistGenero(playlistId) {
  const res = await fetch(`${BASE}/playlist/${playlistId}`)
  const data = await res.json()
  return data
}

export const GENEROS_INDIE = [
  { id: 'indie_rock', nome: 'Indie Rock', query: 'indie rock', icone: 'guitar', cor: '#A341FF' },
  { id: 'indie_pop', nome: 'Indie Pop', query: 'indie pop', icone: 'music', cor: '#CC7EFC' },
  { id: 'indie_folk', nome: 'Indie Folk', query: 'indie folk', icone: 'leaf', cor: '#7B2FBE' },
  { id: 'dream_pop', nome: 'Dream Pop', query: 'dream pop', icone: 'cloud', cor: '#9B59B6' },
  { id: 'shoegaze', nome: 'Shoegaze', query: 'shoegaze', icone: 'wave-square', cor: '#6C3483' },
  { id: 'post_punk', nome: 'Post-Punk', query: 'post punk', icone: 'bolt', cor: '#8E44AD' },
  { id: 'lo_fi', nome: 'Lo-Fi', query: 'lo-fi indie', icone: 'compact-disc', cor: '#D2B4DE' },
]

export async function buscarMusicasPorGenero(generoQuery) {
  const res = await fetch(`${BASE}/search?q=${encodeURIComponent(generoQuery)}&limit=15`)
  const data = await res.json()
  return data.data || []
}
