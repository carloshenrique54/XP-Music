import supabase from "../services/supabase"
import "../styles/Login.css"
import { useState } from "react"
import { Link } from "react-router-dom"

function RedefinirSenha(){
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    async function mudarSenha(e){
        e.preventDefault()
        if (!email) {alert("Coloque um email"); return}
        if (!senha) {alert("Coloque sua nova senha"); return}

        const {data: resposta, error} = await supabase
            .from("usuarios")
            .update({senha: senha})
            .eq("email", email)
            .maybeSingle()

        if (error){
            alert("Erro: ", error)
            return
        }

        console.log(resposta)

        alert("Senha alterada com sucesso")
    }

    return(
        <main>
            <form action="submit" onSubmit={mudarSenha}>
                <h1>Redefinir senha</h1>
                <div className="formInputs">
                    <div className="inputBox">
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <button>Redefinir senha</button>
                    <div className="links">
                        <Link className="link" to={"/cadastro"}>Realizar cadastro</Link>
                        <Link className="link" to={"/"}>Realizar login</Link>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default RedefinirSenha