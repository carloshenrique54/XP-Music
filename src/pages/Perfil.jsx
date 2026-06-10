import "../styles/Perfil.css"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faIdCard, faMapMarkerAlt, faSignOutAlt, faPen, faSave } from "@fortawesome/free-solid-svg-icons"
import supabase from "../services/supabase"

function Perfil() {
    const [usuario, setUsuario] = useState(null)
    const [dadosCompletos, setDadosCompletos] = useState(null)
    const [editando, setEditando] = useState(false)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [totalFavoritos, setTotalFavoritos] = useState(0)
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
        setEditando(false)
        alert("Perfil atualizado")
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

    return (
        <main className="perfilPage">
            <div className="perfilContainer">
                <div className="perfilCard">
                    <div className="perfilAvatarGrande">
                        {dadosCompletos.nome?.[0]?.toUpperCase()}
                    </div>
                    <h1>{dadosCompletos.nome}</h1>
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
                        <h2>Informacoes pessoais</h2>
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
