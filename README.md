<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0015,100:A341FF&height=160&section=header&text=XP%20Music&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Plataforma%20de%20Músicas%20Indie&descSize=20&descAlignY=58&descColor=CC7EFC" />

<br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<br/>

[![XP Music](https://img.shields.io/badge/◈%20Projeto%20Escolar-XP%20Music-A341FF?style=for-the-badge)](https://github.com/carloshenrique54/XP-Music)

</div>

---

## ◈ Visão Geral

O **XP Music** é um aplicativo de streaming de músicas com foco no estilo **Indie**. Ele conecta-se à API do Deezer para fornecer catálogos de subgêneros (como *Indie Rock, Indie Pop, Dream Pop, Shoegaze, Post-Punk e Lo-Fi*) permitindo a reprodução contínua e dinâmica das músicas.

A plataforma utiliza o **Supabase** como backend de banco de dados para o controle de usuários (cadastro, autenticação e redefinição de senha) e armazenamento persistente de playlists favoritas de forma síncrona.

---

## ✦ Funcionalidades

| ◆ Módulo | › Descrição |
|----------|-------------|
| `[ Cadastro completo ]` | Formulário com Nome, E-mail, CPF, Endereço (autocompleta via CEP com API ViaCEP) e Senha |
| `[ Login e Autenticação ]` | Autenticação direta contra a tabela usuarios no Supabase |
| `[ Redefinição de Senha ]` | Fluxo completo de alteração de senha integrada com validações de segurança |
| `[ Página Inicial ]` | Banner decorativo exclusivo e seções com scroll horizontal para lançamentos e tendências |
| `[ Catálogo e Gêneros ]` | Grade de subgêneros indie com mais de 10 conteúdos reais carregados sob demanda |
| `[ Player Integrado ]` | Player de áudio persistente com barra de progresso ajustável, volume e controle de fila (anterior/próxima) |
| `[ Lista de Favoritos ]` | Adicionar e remover faixas aos favoritos com sincronização automática no Supabase |

---

## ⚙ Stack Tecnológica

```
◆ Frontend     →  React 19.2.6 + Vite 8.0.12
◆ Roteamento   →  React Router DOM 7.17.0
◆ Banco Dados  →  Supabase Client 2.108.0
◆ Ícones       →  FontAwesome SVG 7.2.0
◆ Estilização  →  Custom CSS Design System
◆ API Externa  →  Deezer API & ViaCEP API
```

---

## ▸ Como Executar Localmente

**Pré-requisitos:** Node.js `v18+` e npm instalados.

```bash
# › Clone o repositório
git clone https://github.com/carloshenrique54/XP-Music.git

# › Acesse o diretório
cd XP-Music

# › Instale as dependências
npm install

# › Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível por padrão em `http://localhost:5173`

```bash
# › Build para produção
npm run build

# › Rodar preview do build
npm run preview
```

---

## ◉ Estrutura do Projeto

```
XP-Music/
├── public/             ◆ Favicon e assets públicos
├── src/
│   ├── assets/         ◆ Fontes e imagens (banner, fundo de login)
│   ├── components/     ◆ Sidebar, Player, MusicCard
│   ├── contexts/       ◆ Contexto do Player global de áudio
│   ├── pages/          ◆ Login, Cadastro, RedefinirSenha, Inicio, Explorar, Generos, Favoritos, Perfil
│   ├── services/       ◆ Integração com Supabase e API do Deezer
│   ├── styles/         ◆ Estilos customizados e Design System (App.css, Login.css, etc.)
│   ├── App.jsx         ◆ Roteamento geral da aplicação
│   └── main.jsx        ◆ Arquivo de montagem do React
├── package.json        ◆ Dependências e scripts do npm
└── README.md           ◆ Documentação do projeto
```

---

## ◆ Equipe

<div align="center">

| `[ Dev ]` Carlos Henrique |
|:---:|

| `[ Dev ]` João Lucas |
|:---:|

| `[ Dev ]` Gustavo Leite |
|:---:|

| `[ Dev ]` Luiz Felipe |
|:---:|

</div>

---

## → Links

<div align="center">

[![Repositório](https://img.shields.io/badge/GitHub-Repositório-181717?style=for-the-badge&logo=github)](https://github.com/carloshenrique54/XP-Music)

</div>

---

## ◈ Licença

Distribuído sob a licença **MIT**.

<div align="center">
<br/>
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:A341FF,100:0A0015&height=100&section=footer" />
</div>
