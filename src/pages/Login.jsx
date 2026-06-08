import "../styles/Login.css"

function Login(){
    return(
        <main>
            <form action="">
                <h1>Login</h1>
                <div className="formInputs">
                    <div className="inputBox">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Senha</label>
                        <input type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <button>Fazer login</button>
                </div>
            </form>
        </main>
    )
}

export default Login