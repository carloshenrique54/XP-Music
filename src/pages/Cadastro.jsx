import "../styles/Cadastro.css"
import { useState } from "react"
import { Link } from "react-router-dom"

function Cadastro(){
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    async function realizarLogin(e){
        e.preventDefault()

        const {data: resposta, error} = await supabase
            .from("usuarios")
            .select("email")
            .eq("email", email)

        if (error){
            alert("Erro: ", error)
        }
    }

    return(
        <main>
            <form action="submit" onSubmit={realizarLogin}>
                <h1>Cadastro</h1>
                <div className="formInputs">
                    <div className="inputBox">
                        <label htmlFor="email">Nome</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">CEP</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="email">CPF</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <button>Fazer cadastro</button>
                    <div className="links">
                        <Link className="link" to={"/"}>Realizar login</Link>
                        <Link className="link" to={"/redefinirsenha"}>Esqueci a senha</Link>
                    </div>
                </div>
            </form>
        </main>
    )
}

export default Cadastro