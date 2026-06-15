import supabase from "../services/supabase"
import "../styles/Login.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faMusic } from "@fortawesome/free-solid-svg-icons"

function Login(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()

    async function realizarLogin(e){
        e.preventDefault()
        if (!email) {toast.error("Coloque um email"); return}
        if (!senha) {toast.error("Insira sua senha"); return}

        setCarregando(true)

        const {data: resposta, error} = await supabase
            .from("usuarios")
            .select("*")
            .eq("senha", senha)
            .eq("email", email)
            .maybeSingle()

        setCarregando(false)

        if (error){
            toast.error("Erro ao realizar login")
            return
        }

        if (!resposta){
            toast.error("Conta nao localizada")
            return
        }

        const usuario = { email, id: resposta.id, nome: resposta.nome };
        localStorage.setItem("usuario", JSON.stringify(usuario))

        toast.success("Login realizado com sucesso!")
        navigate("/inicio")
    }

    return(
        <main className="loginPage">
            <div className="loginContainer">
                <div className="loginLeft">
                    <div className="loginBrand">
                        <h1 className="loginLogoText">XP<span>MUSIC</span></h1>
                        <p className="loginSlogan">Sua plataforma indie favorita</p>
                    </div>
                </div>
                <div className="loginRight">
                    <form className="loginForm" onSubmit={realizarLogin}>
                        <h2>Bem-vindo de volta</h2>
                        <p className="loginSubtitle">Entre na sua conta para continuar</p>
                        <div className="formInputs">
                            <div className="inputBox">
                                <label htmlFor="email">E-mail</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
                                    <input
                                        id="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="exemplo@gmail.com"
                                    />
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="password">Senha</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faLock} className="inputIcon" />
                                    <input
                                        id="password"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                        type="password"
                                        placeholder="Minimo 8 caracteres"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btnPrincipal" disabled={carregando}>
                            {carregando ? "Entrando..." : "Fazer login"}
                        </button>
                        <div className="links">
                            <Link className="link" to="/cadastro">Criar conta</Link>
                            <Link className="link" to="/redefinirsenha">Esqueci a senha</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Login