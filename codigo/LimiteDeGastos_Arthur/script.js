function leDados () {
  let strDados = localStorage.getItem('db2');
  let objDados = {};

  if (strDados) {
      objDados = JSON.parse (strDados);
  }
  else {
      objDados = { limite: [ 
                      {limite: "0"},
                      {limite: "100"},
                      {limite: "2000"},
                      {limite: "400"}  
                  ]}
  }

  return objDados;
}

function salvaDados (dados2) {
  localStorage.setItem ('db2', JSON.stringify (dados2));
}

function incluirLimite (){
  // Ler os dados do localStorage
  let objDados = leDados();

  // Incluir um novo limite
  let strlimite = document.getElementById ('limite').value;
  let novoLimite = {
      limite: strlimite
  };
  objDados.limite.push (novoLimite);

  // Salvar os dados no localStorage novamente
  salvaDados (objDados);

  // Atualiza os dados da tela
  imprimeDados ();
}

function imprimeDados() {
  let tela = document.getElementById('tela');
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
let tela2 = document.getElementById('tela2');
let objDados = leDados();

let strHtml = '';
for (let i = 0; i < objDados.limite.length; i++) {
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

// Configura os botões
imprimeDados();
document.getElementById('btnMostrarDados').addEventListener('click', imprimeDados2);
document.getElementById ('salvarLimite').addEventListener ('click', incluirLimite);