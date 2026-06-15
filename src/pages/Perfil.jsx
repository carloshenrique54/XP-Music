import "../styles/Perfil.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faIdCard, faMapMarkerAlt, faSignOutAlt, faPen, faSave, faCamera, faMusic, faClock } from "@fortawesome/free-solid-svg-icons"
import supabase from "../services/supabase"

function Perfil() {
    const [usuario, setUsuario] = useState(null)
    const [dadosCompletos, setDadosCompletos] = useState(null)
    const [editando, setEditando] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [totalFavoritos, setTotalFavoritos] = useState(0)
    const [carregandoAvatar, setCarregandoAvatar] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario"))
        if (!u) { navigate("/"); return }
        setUsuario(u)
        carregarDados(u.id)
        contarFavoritos(u.id)
    }, [])

    async function carregarDados(id) {
        const { data } = await supabase
            .from("usuarios")
            .select("*")
            .eq("id", id)
            .maybeSingle()
        if (data) {
            setDadosCompletos(data)
            setNome(data.nome)
            setEmail(data.email)
        }
    }

    async function contarFavoritos(userId) {
        const { data } = await supabase
            .from("favoritos")
            .select("id")
            .eq("usuario_id", userId)
        setTotalFavoritos(data?.length || 0)
    }

    async function salvarPerfil() {
        if (!nome.trim()) { alert("O nome não pode ficar em branco."); return }
        if (!email.trim()) { alert("O e-mail não pode ficar em branco."); return }

        const { error } = await supabase
            .from("usuarios")
            .update({ nome, email })
            .eq("id", usuario.id)

        if (error) {
            alert("Erro ao salvar")
            return
        }

        const novoUsuario = { ...usuario, nome, email }
        localStorage.setItem("usuario", JSON.stringify(novoUsuario))
        setUsuario(novoUsuario)
        setDadosCompletos(prev => ({ ...prev, nome, email }))
        setEditando(false)
        alert("Perfil atualizado")
    }

    async function lidarComUpload(e) {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setCarregandoAvatar(true)
            const fileExt = file.name.split('.').pop()
            const fileName = `${usuario.id}-${Date.now()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, { cacheControl: '3600', upsert: true })

            if (uploadError) {
                console.error("Erro no upload:", uploadError)
                alert("Erro ao fazer upload da imagem: " + uploadError.message)
                return
            }

            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath)

            const publicUrl = data.publicUrl

            const { error: updateError } = await supabase
                .from("usuarios")
                .update({ avatar_url: publicUrl })
                .eq("id", usuario.id)

            if (updateError) {
                alert("Erro ao salvar URL no perfil")
                return
            }

            const novoUsuario = { ...usuario, avatar_url: publicUrl }
            localStorage.setItem("usuario", JSON.stringify(novoUsuario))
            setUsuario(novoUsuario)
            setDadosCompletos(prev => ({ ...prev, avatar_url: publicUrl }))
            alert("Foto de perfil atualizada!")
        } catch (err) {
            console.error(err)
            alert("Erro ao fazer upload da foto.")
        } finally {
            setCarregandoAvatar(false)
        }
    }

    function sair() {
        localStorage.removeItem("usuario")
        navigate("/")
    }

    if (!dadosCompletos) return null

    function formatarCpf(cpf) {
        if (!cpf) return ""
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    function formatarCep(cep) {
        if (!cep) return ""
        return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
    }

    function obterNivelUsuario(total) {
        if (total === 0) return { titulo: "Silencioso", cor: "#7A6690" }
        if (total < 5) return { titulo: "Ouvinte Casual", cor: "#4ECB71" }
        if (total < 15) return { titulo: "Fã Independente", cor: "#CC7EFC" }
        return { titulo: "Guru do Indie", cor: "#A341FF" }
    }

    const nivel = obterNivelUsuario(totalFavoritos)

    return (
        <main className="perfilPage">
            <div className="perfilCover">
                <div className="perfilCoverOverlay"></div>
            </div>
            
            <div className="perfilContainer">
                <div className="perfilCard">
                    <div className="perfilAvatarGrandeContainer">
                        <div className="perfilAvatarGrande">
                            {dadosCompletos.avatar_url ? (
                                <img src={dadosCompletos.avatar_url} alt={dadosCompletos.nome} className="perfilAvatarGrandeImg" />
                            ) : (
                                dadosCompletos.nome?.[0]?.toUpperCase()
                            )}
                            <label htmlFor="avatar-upload" className="perfilAvatarUploadLabel">
                                <FontAwesomeIcon icon={faCamera} />
                            </label>
                        </div>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={lidarComUpload}
                            disabled={carregandoAvatar}
                        />
                        {carregandoAvatar && <div className="avatarLoadingGlow"></div>}
                    </div>

                    <h1>{dadosCompletos.nome}</h1>
                    <span className="perfilNivelBadge" style={{ backgroundColor: nivel.cor + '22', color: nivel.cor, border: `1px solid ${nivel.cor}44` }}>
                        {nivel.titulo}
                    </span>
                    <p className="perfilEmail">{dadosCompletos.email}</p>
                    
                    <div className="perfilStats">
                        <div className="perfilStat">
                            <span className="perfilStatNum">{totalFavoritos}</span>
                            <span className="perfilStatLabel">Favoritos</span>
                        </div>
                    </div>
                </div>

                <div className="perfilDetalhes">
                    <div className="perfilDetalhesHeader">
                        <h2>Informações Pessoais</h2>
                        <button className="perfilEditBtn" onClick={() => editando ? salvarPerfil() : setEditando(true)}>
                            <FontAwesomeIcon icon={editando ? faSave : faPen} />
                            {editando ? "Salvar" : "Editar"}
                        </button>
                    </div>

                    <div className="perfilCampos">
                        <div className="perfilCampo">
                            <div className="perfilCampoIcon">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="perfilCampoInfo">
                                <label>Nome</label>
                                {editando ? (
                                    <input value={nome} onChange={e => setNome(e.target.value)} />
                                ) : (
                                    <span>{dadosCompletos.nome}</span>
                                )}
                            </div>
                        </div>
                        <div className="perfilCampo">
                            <div className="perfilCampoIcon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="perfilCampoInfo">
                                <label>E-mail</label>
                                {editando ? (
                                    <input value={email} onChange={e => setEmail(e.target.value)} />
                                ) : (
                                    <span>{dadosCompletos.email}</span>
                                )}
                            </div>
                        </div>
                        <div className="perfilCampo">
                            <div className="perfilCampoIcon">
                                <FontAwesomeIcon icon={faIdCard} />
                            </div>
                            <div className="perfilCampoInfo">
                                <label>CPF</label>
                                <span>{formatarCpf(dadosCompletos.cpf)}</span>
                            </div>
                        </div>
                        <div className="perfilCampo">
                            <div className="perfilCampoIcon">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div className="perfilCampoInfo">
                                <label>CEP</label>
                                <span>{formatarCep(dadosCompletos.cep)}</span>
                            </div>
                        </div>
                    </div>

                    <button className="perfilSairBtn" onClick={sair}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Sair da conta
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Perfil
