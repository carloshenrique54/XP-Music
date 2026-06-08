import "../styles/Cadastro.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import supabase from "../services/supabase"

function Cadastro(){
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [cep, setCep] = useState()
    const [cpf, setCpf] = useState()
    const [senha, setSenha] = useState()
    const [senhaConfirmar, setConfirmarSenha] = useState()

    fetch("https://viacep.com.br")

    const formatarCpf = (valor) => {
        let v = valor.replace(/\D/g, '');
        
        if (v.length > 11) v = v.substring(0, 11);

        if (v.length > 9) {
            v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
        } else if (v.length > 6) {
            v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (v.length > 3) {
            v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }

        setCpf(v);
    };

    const formatarCep = (valor) => {
    let v = valor.replace(/\D/g, ''); 
    if (v.length > 8) v = v.substring(0, 8); 

    if (v.length > 5) {
      v = v.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    setCep(v);
  };

    async function realizarLogin(e){
        e.preventDefault()
        if (!nome){alert("Insira seu nome"); return}
        if (!email){alert("Insira seu e-mail"); return}
        if (!cep){alert("Insira seu cep válido"); return}
        if (cpf < 14 || cpf > 14){alert("Insira um CPF válido"); return}
        if (senha < 8){alert("A senha precisa ter 8 caracteres"); return}
        if (senhaConfirmar != senha){alert("As senhas não coencidem"); return}
        const cpfLimpo = cpf.replace(/\D/g, '');
        const cepLimpo = cep.replace(/\D/g, '');

        const {data: resposta, error} = await supabase
            .from("usuarios")   
            .insert([{nome: nome, email: email, cep: cepLimpo, cpf: cpfLimpo, senha: senha}])
            .eq("email", email)

        if (error){
            alert("Erro: ", error)
        }

        alert("Cadastro realizado com sucesso! Faça login")
        console.log(resposta)

    }

    return(
        <main>
            <form className="cadastroForm" action="submit" onSubmit={realizarLogin}>
                <h1>Cadastro</h1>
                <div className="formInputs">
                    <div className="inputBox">
                        <label htmlFor="nome">Nome</label>
                        <input value={nome} onChange={e => setNome(e.target.value)} type="text " placeholder="Nome completo"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="email">E-mail</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="cep">CEP</label>
                        <input value={cep} onChange={e => formatarCep(e.target.value)} type="text" placeholder="Apenas números"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="cpf">CPF</label>
                        <input maxLength={14} value={cpf} onChange={e => formatarCpf(e.target.value)} type="text" placeholder="Apenas números"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Senha</label>
                        <input value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                    <div className="inputBox">
                        <label htmlFor="password">Confirmar Senha</label>
                        <input value={senhaConfirmar} onChange={e => setConfirmarSenha(e.target.value)} type="password" placeholder="Mínimo 8 caracteres"/>
                    </div>
                </div>
                <div className="bottomForms">
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