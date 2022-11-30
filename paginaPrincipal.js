let lembretes = [];
const descricao = document.querySelector("#descricao");
const detalhamento = document.querySelector("#detalhamento");
const btnSalvar = document.querySelector("#btnSalvar");
const btnSair = document.querySelector("#Sair");
const tabela = document.querySelector("#tabela");

if (localStorage.getItem("usuarioLogado") === null) {
  window.location.href = "index.html";
}

if (
  localStorage.getItem("recados") === null ||
  JSON.parse(localStorage.getItem("recados")) === []
) {
} else {
  const idUser = localStorage.getItem("usuarioLogado");
  const recados = JSON.parse(localStorage.getItem("recados"));
  recados
    .filter((el) => el.idUser === idUser)
    .forEach((el) => {
      tabela.innerHTML += `<tr id="${el.idRecado}"><th>${el.descricao}</th><td>${el.detalhamento}</td><td><button id="btnEditar" class="btns" onclick="editar('${el.idRecado}')">Editar</button><button id="btnExcluir" onclick="excluir('${el.idRecado}')" class="btns">Excluir</button></td></tr>`;
    });
}

function salvar() {
  const idRecado = makeId(15);
  const idUser = localStorage.getItem("usuarioLogado");
  const novoLembrete = {
    descricao: `${descricao.value}`,
    detalhamento: `${detalhamento.value}`,
    idUser: `${idUser}`,
    idRecado: `${idRecado}`,
  };
  console.log(novoLembrete);
  if (descricao.value === "" || detalhamento.value === "") {
    alert("Digite uma descrição e detalhamento antes de salvar.");
  } else if (localStorage.getItem("recados") === null) {
    lembretes.push(novoLembrete);
    localStorage.setItem("recados", JSON.stringify(lembretes));
    tabela.innerHTML += `<tr id='${idRecado}'><th>${descricao.value}</th><td>${detalhamento.value}</td><td><button id="btnEditar" class="btns" onclick="editar('${idRecado}')">Editar</button><button id="btnExcluir" onclick="excluir('${idRecado}')" class="btns">Excluir</button></td></tr>`;
    descricao.value = "";
    detalhamento.value = "";
  } else if (localStorage.getItem("recados") != null) {
    lembretes = JSON.parse(localStorage.getItem("recados"));
    lembretes.push(novoLembrete);
    localStorage.setItem("recados", JSON.stringify(lembretes));
    tabela.innerHTML += `<tr id='${idRecado}'><th>${descricao.value}</th><td>${detalhamento.value}</td><td><button id="btnEditar" class="btns" onclick="editar('${idRecado}')">Editar</button><button id="btnExcluir" onclick="excluir('${idRecado}')" class="btns">Excluir</button></td></tr>`;
    descricao.value = "";
    detalhamento.value = "";
  }
}

function sair() {
  localStorage.removeItem("usuarioLogado");
  if (localStorage.getItem("usuarioLogado") === null) {
    window.location.href = "index.html";
  }
}

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

function excluir(idRecado) {
  const tr = document.getElementById(`${idRecado}`);
  tr.remove();
  const lembrete = JSON.parse(localStorage.getItem("recados"));
  lembretes = lembrete.filter((el) => el.idRecado != idRecado);
  localStorage.setItem("recados", JSON.stringify(lembretes));
}

function editar(idRecado) {
  descricao.setAttribute("style", "border: solid 3px red;");
  detalhamento.setAttribute("style", "border: solid 3px red;");
  const tr = document.getElementById(`${idRecado}`);
  const lembrete = JSON.parse(localStorage.getItem("recados"));
  lembretes = lembrete.find((el) => el.idRecado === idRecado);
  descricao.value = lembretes.descricao;
  detalhamento.value = lembretes.detalhamento;

  tr.remove();
  lembretes = lembrete.filter((el) => el.idRecado != idRecado);
  localStorage.setItem("recados", JSON.stringify(lembretes));
  setTimeout(() => {
    descricao.removeAttribute("style");
    detalhamento.removeAttribute("style");
  }, 2000);
}

btnSalvar.addEventListener("click", salvar);
btnSair.addEventListener("click", sair);
