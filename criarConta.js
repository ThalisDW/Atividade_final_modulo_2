function makeId(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function checkUserUnico() {
    const userSpan = document.querySelector("#spanUserMsg");
    if (usuario.value === "") {
      usuario.setAttribute("style", "border: 1.5px solid #DDB940");
      userSpan.setAttribute("style", "color: #DDB940");
      userSpan.innerText = "Campo de usuario vazio.";
      senha.setAttribute("disabled", "true");
      confirmSenha.setAttribute("disabled", "true");
    } else if (usuarios.some((el) => el.nome === usuario.value)) {
      usuario.setAttribute("style", "border: 1.5px solid red");
      userSpan.setAttribute("style", "color: red");
      userSpan.innerText = "Usuario já existente.";
    } else {
      usuario.setAttribute("style", "border: 1.5px solid #32A428");
      userSpan.setAttribute("style", "color: #32A428");
      userSpan.innerText = "Usuario validado.";
      senha.removeAttribute("disabled");
    }
  }
  
  function fazLog() {
    window.location.href = "index.html";
  }

function validarSenha(){
    const spanSenhaMsg = document.querySelector("#spanSenhaMsg")
    if (senha.value === "") {
        senha.setAttribute("style", "border: 1.5px solid #DDB940");
        spanSenhaMsg.setAttribute("style", "color: #DDB940");
        spanSenhaMsg.innerText = "Campo senha vazio.";
        confirmSenha.setAttribute("disabled", "true");
    }
    else if (senha.value.length >0 && senha.value.length <= 5) {
        senha.setAttribute("style", "border: 1.5px solid red");
        spanSenhaMsg.setAttribute("style", "color: red");
        spanSenhaMsg.innerText = "Mínimo 6 caracter.";
    }else{
        senha.setAttribute("style", "border: 1.5px solid #32A428");
      spanSenhaMsg.setAttribute("style", "color: #32A428");
      spanSenhaMsg.innerText = "Senha válida.";
      confirmSenha.removeAttribute("disabled");
    }
}

function validarConfirm(){
  const spamSenhaConf = document.querySelector("#spanConfMsg")
  if (confirmSenha.value === senha.value){
    confirmSenha.setAttribute("style", "border: 1.5px solid #32A428")
    spamSenhaConf.setAttribute("style", "color: #32A428")
    spamSenhaConf.innerText= "Senha válida."
    criaUsuario.setAttribute("style", "cursor: pointer")
    criaUsuario.removeAttribute("disabled")
  }else if(confirmSenha.value === ""){
    confirmSenha.setAttribute("style", "border: 1.5px solid #DDB940");
    spamSenhaConf.setAttribute("style", "color: #DDB940");
    spamSenhaConf.innerText = "Campo confirmar senha vazio.";
  }else{
    confirmSenha.setAttribute("style", "border: 1.5px solid red");
    spamSenhaConf.setAttribute("style", "color: red");
    spamSenhaConf.innerText = "Senha inválida.";
  }
}

function criarLog(e){
  e.preventDefault()
  id = makeId(10)
  const usuarios = JSON.parse(localStorage.getItem("usuarios"))
  const newUser = {nome:`${usuario.value}`, senha:`${confirmSenha.value}`, id:`${id}`}
  usuarios.push(newUser)
  localStorage.setItem("usuarios",JSON.stringify(usuarios))
    window.location.href="index.html"
}

const usuario = document.getElementById("CriaNomeUsuario");
const senha = document.querySelector("#CriaSenha");
const confirmSenha = document.querySelector("#ConfSenha");
const criaUsuario = document.querySelector("#CriarLogin");

const usuarios = JSON.parse(localStorage.getItem("usuarios"));


usuario.addEventListener("blur", checkUserUnico);
senha.addEventListener("blur",validarSenha)
confirmSenha.addEventListener("blur",validarConfirm)
criaUsuario.addEventListener("click", criarLog)


document.querySelector("#fazerLogin").addEventListener("click", fazLog);
