import supabase from "../services/supabase"
import "../styles/Login.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faMusic, faKey } from "@fortawesome/free-solid-svg-icons"

function RedefinirSenha(){
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()

    async function mudarSenha(e){
        e.preventDefault()
        if (!email) {alert("Coloque um email"); return}
        if (!senha) {alert("Coloque sua nova senha"); return}
        if (senha.length < 8) {alert("A senha precisa ter 8 caracteres"); return}

        setCarregando(true)

        const {error} = await supabase
            .from("usuarios")
            .update({senha: senha})
            .eq("email", email)

        setCarregando(false)

        if (error){
            alert("Erro ao redefinir senha")
            return
        }

        alert("Senha alterada com sucesso")
        navigate("/")
    }

    return(
        <main className="loginPage">
            <div className="loginContainer">
                <div className="loginLeft">
                    <div className="loginBrand">
                        <h1 className="loginLogoText">XP<span>MUSIC</span></h1>
                        <p className="loginSlogan">Redefina sua senha com seguranca</p>
                    </div>
                </div>
                <div className="loginRight">
                    <form className="loginForm" onSubmit={mudarSenha}>
                        <div className="redefinirIcone">
                            <FontAwesomeIcon icon={faKey} />
                        </div>
                        <h2>Redefinir senha</h2>
                        <p className="loginSubtitle">Informe seu e-mail e a nova senha</p>
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
                                <label htmlFor="novaSenha">Nova senha</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faLock} className="inputIcon" />
                                    <input
                                        id="novaSenha"
                                        value={senha}
                                        onChange={e => setSenha(e.target.value)}
                                        type="password"
                                        placeholder="Minimo 8 caracteres"
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="btnPrincipal" disabled={carregando}>
                            {carregando ? "Redefinindo..." : "Redefinir senha"}
                        </button>
                        <div className="links">
                            <Link className="link" to="/">Voltar ao login</Link>
                            <Link className="link" to="/cadastro">Criar conta</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default RedefinirSenha