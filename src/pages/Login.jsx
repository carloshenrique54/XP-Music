import supabase from "../services/supabase"
import "../styles/Login.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login(){
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const navigate = useNavigate()

    async function realizarLogin(e){
        e.preventDefault()
        if (!senha) {alert("Insira sua senha"); return}
        if (!email) {alert("Coloque um email"); return}

        const {data: resposta, error} = await supabase
            .from("usuarios")
            .select("*")
            .eq("senha", senha)
            .eq("email", email)
            .maybeSingle()

        if (error){
            alert("Erro: ", error)
            return
        }

        if (!resposta){
            alert("Conta não localizada")
            return
        }

        alert("Login realizado com sucesso!")

        const usuario = { email, senha, id: resposta.id }; 
        localStorage.setItem("usuario", JSON.stringify(usuario))

        navigate("/inicio")
    }

    return(
        <main>
            <form action="submit" onSubmit={realizarLogin}>
                <h1>Login</h1>
                <div className="formInputs">
                    <div className="inputBox">
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <button>Fazer login</button>
                    <div className="links">
                        <Link className="link" to={"/cadastro"}>Realizar cadastro</Link>
                        <Link className="link" to={"/redefinirsenha"}>Esqueci a senha</Link>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Login