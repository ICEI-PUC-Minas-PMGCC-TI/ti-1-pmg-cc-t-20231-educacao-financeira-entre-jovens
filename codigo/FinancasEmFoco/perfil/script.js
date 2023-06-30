// LIMITE
function leDados () {
  let strDados = localStorage.getItem('db2');
  let objDados = {};

  if (strDados) {
      objDados = JSON.parse (strDados);
  }
  else {
      objDados = { limite: [ 
                      {limite: "0"},
                  ]}
  }

  return objDados;
}

function salvaDados (dados2) {
  localStorage.setItem ('db2', JSON.stringify (dados2));
}

function incluirLimite() {
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo limite
  let strLimite = document.getElementById('limite').value;

  // Verificar se o input é um número e não está vazio
  if (!isNaN(strLimite) && strLimite.trim() !== '') {
    let novoLimite = {
      limite: parseFloat(strLimite)
    };
    objDados.limite.push(novoLimite);

    // Salvar os dados no localStorage novamente
    salvaDados(objDados);

    // Atualiza os dados da tela
    imprimeDados();
  } else {
    alert("Por favor, insira um número válido para o limite.");
  }
}

function imprimeDados() {
  let tela = document.getElementById('telaLimite');
  let objDados = leDados();

  if (objDados.limite.length > 0) {
    let ultimoLimite = objDados.limite[objDados.limite.length - 1];
    tela.innerHTML = `<p>R$${ultimoLimite.limite},00</p>`;
  } else {
    tela.innerHTML = '';
  }
}

let dadosVisiveis = false;

function imprimeDados2() {
  let tela2 = document.getElementById('telaLimite2');
  let objDados = leDados();
  let strHtml = '';
  let limiteInicial = Math.max(objDados.limite.length - 10, 0); // Define o limite inicial do loop
  
  for (let i = objDados.limite.length - 1; i >= limiteInicial; i--) {
    strHtml += `<p>R$${objDados.limite[i].limite},00</p>`;
  }

  if (dadosVisiveis) {
    tela2.innerHTML = '';
    dadosVisiveis = false;
  } else {
    tela2.innerHTML = strHtml;
    dadosVisiveis = true;
  }
}



 // DICAS
 // Dados em formato JSON
 const jsonDicas = `{
  "dicas": [
    {
      "titulo": "1 - Pense se você precisa realmente comprar algum determinado produto",
      "descricao": "Faça uma reflexão se o produto que você quer comprar terá alguma utilidade pra você."
    },
    {
      "titulo": "2 - Faça uma pesquisa antes de comprar algum produto",
      "descricao": "Pesquise os preços do produto que você irá comprar em lojas diferentes."
    },
    {
      "titulo": "3 - Faça um fundo de emergência",
      "descricao": "Pense em criar uma reserva de dinheiro pra você usar em caso de emergência."
    },
    {
      "titulo": "4 - Não compre algo por impulso",
      "descricao": "Não compre qualquer coisa somente pelo simples prazer em gastar dinheiro, pois tem o risco de você acumular dívidas."
    },
    {
      "titulo": "5 - Faça metas para o seu dinheiro",
      "descricao": "Pense como você irá obter resultados a longo prazo se você estabelecer objetivos para o seu dinheiro."
    },
    {
      "titulo": "6 - Comece a investir o seu dinheiro",
      "descricao": "Pense nos resultados a longo prazo que você terá, caso comece a investir o seu dinheiro corretamente."
    }
  ]
}`;

const dicas = JSON.parse(jsonDicas); // Converter o JSON para objeto JavaScript
const dicasList = document.getElementById("dicas-list");

function renderizarDicas() {
  dicasList.innerHTML = ""; // Limpar as dicas existentes

  dicas.dicas.forEach((dica) => {
    const dicaElement = document.createElement("div");
    dicaElement.classList.add("dica");

    const tituloElement = document.createElement("h2");
    tituloElement.classList.add("titulo");
    tituloElement.textContent = dica.titulo;

    const descricaoElement = document.createElement("p");
    descricaoElement.classList.add("descricao");
    descricaoElement.textContent = dica.descricao;

    dicaElement.appendChild(tituloElement);
    dicaElement.appendChild(descricaoElement);

    dicasList.appendChild(dicaElement);
  });
}

function pesquisar() {
  const searchInput = document.getElementById("search-input").value.toLowerCase();
  const dicaElements = dicasList.getElementsByClassName("dica");

  for (let i = 0; i < dicaElements.length; i++) {
    const tituloElement = dicaElements[i].querySelector(".titulo");
    const descricaoElement = dicaElements[i].querySelector(".descricao");

    const titulo = tituloElement.textContent.toLowerCase();
    const descricao = descricaoElement.textContent.toLowerCase();

    if (titulo.includes(searchInput) || descricao.includes(searchInput)) {
      dicaElements[i].classList.add("destaque");
    } else {
      dicaElements[i].classList.remove("destaque");
    }
  }
}

// Perfil
let userLogado = JSON.parse(localStorage.getItem('userLogado'));

let logado = document.querySelector('#logado');

logado.innerHTML = `Olá ${userLogado.nome}, seja bem vindo!`;


if(localStorage.getItem('token') == null){
    alert("Você precisa estar logado para acessar essa página");
    window.location.href = 'login.html';

    
}

function sair ()
{
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href = '../cadastro-login/login.html';
    
}


// Configura os botões
renderizarDicas();
imprimeDados();
document.getElementById('btnMostrarDados').addEventListener('click', imprimeDados2);
document.getElementById ('salvarLimite').addEventListener ('click', incluirLimite);