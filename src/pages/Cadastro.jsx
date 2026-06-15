import "../styles/Cadastro.css"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import supabase from "../services/supabase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faEnvelope, faMapMarkerAlt, faIdCard, faLock, faMusic } from "@fortawesome/free-solid-svg-icons"

function Cadastro(){
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cep, setCep] = useState("")
    const [cpf, setCpf] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setConfirmarSenha] = useState("")
    const [cepCerto, setCepCerto] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()

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

    async function realizarCadastro(e){
        e.preventDefault()
        if (!nome){toast.error("Insira seu nome"); return}
        if (!email){toast.error("Insira seu e-mail"); return}
        if (!cep){toast.error("CEP invalido"); return}
        if (!cepCerto){toast.error("CEP invalido"); return}
        if (cpf.length < 14){toast.error("Insira um CPF valido"); return}
        if (senha.length < 8){toast.error("A senha precisa ter 8 caracteres"); return}
        if (senhaConfirmar !== senha){toast.error("As senhas nao coincidem"); return}

        const cpfLimpo = cpf.replace(/\D/g, '');
        const cepLimpo = cep.replace(/\D/g, '');

        setCarregando(true)

        const {error} = await supabase
            .from("usuarios")
            .insert([{nome: nome, email: email, cep: cepLimpo, cpf: cpfLimpo, senha: senha}])

        setCarregando(false)

        if (error){
            toast.error("Erro ao cadastrar")
            return
        }

        toast.success("Cadastro realizado com sucesso! Faca login")
        navigate("/")
    }

    useEffect(() => {
        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length === 8){
            fetch(`https://viacep.com.br/ws/${cepLimpo}/json`)
                .then(resposta => resposta.json())
                .then(dados => {
                    if (dados.erro){
                        setCepCerto(false)
                        toast.error("CEP invalido")
                    } else {
                        setCepCerto(true)
                    }
                })
        }
    }, [cep])

    return(
        <main className="cadastroPage">
            <div className="cadastroContainer">
                <div className="cadastroLeft">
                    <div className="cadastroBrand">
                        <h1 className="cadastroLogoText">XP<span>MUSIC</span></h1>
                        <p className="cadastroSlogan">Crie sua conta e descubra o melhor do indie</p>
                    </div>
                </div>
                <div className="cadastroRight">
                    <form className="cadastroForm" onSubmit={realizarCadastro}>
                        <h2>Criar conta</h2>
                        <p className="cadastroSubtitle">Preencha seus dados para comecar</p>
                        <div className="formInputs">
                            <div className="inputBox">
                                <label htmlFor="nome">Nome</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faUser} className="inputIcon" />
                                    <input id="nome" value={nome} onChange={e => setNome(e.target.value)} type="text" placeholder="Nome completo"/>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="email">E-mail</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faEnvelope} className="inputIcon" />
                                    <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"/>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="cep">CEP</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="inputIcon" />
                                    <input id="cep" maxLength={9} value={cep} onChange={e => formatarCep(e.target.value)} type="text" placeholder="Apenas numeros"/>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="cpf">CPF</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faIdCard} className="inputIcon" />
                                    <input id="cpf" maxLength={14} value={cpf} onChange={e => formatarCpf(e.target.value)} type="text" placeholder="Apenas numeros"/>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="senha">Senha</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faLock} className="inputIcon" />
                                    <input id="senha" value={senha} onChange={e => setSenha(e.target.value)} type="password" placeholder="Minimo 8 caracteres"/>
                                </div>
                            </div>
                            <div className="inputBox">
                                <label htmlFor="confirmarSenha">Confirmar Senha</label>
                                <div className="inputWrapper">
                                    <FontAwesomeIcon icon={faLock} className="inputIcon" />
                                    <input id="confirmarSenha" value={senhaConfirmar} onChange={e => setConfirmarSenha(e.target.value)} type="password" placeholder="Repita a senha"/>
                                </div>
                            </div>
                        </div>
                        <button className="btnPrincipal" disabled={carregando}>
                            {carregando ? "Cadastrando..." : "Fazer cadastro"}
                        </button>
                        <div className="links">
                            <Link className="link" to="/">Ja tenho conta</Link>
                            <Link className="link" to="/redefinirsenha">Esqueci a senha</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default Cadastro