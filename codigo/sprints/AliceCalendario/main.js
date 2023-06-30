
function leDados(){
  let strDados = localStorage.getItem('db');
  let objDados = {};
  
  if (strDados){
    objDados = JSON.parse (strDados);
  } else {
    objDados = { rendas : [ 
      {pagamento: "2000,00", data: "15/05/2023"}, 
      {pagamento: "4500,00", data: "10/01/2024"}, 
      {pagamento: "8400,00", data: "12/09/2023"} ]
        }
  }
  return objDados;
}

function salvaDados (dados) {
  localStorage.setItem ('db', JSON.stringify (dados));
}

function editarDados(){
 let objDados = leDados();

 let strValor = document.getElementById ('valor').value;
 let strData = document.getElementById ('data').value;
  let novaRenda = {
      pagamento: strValor,
      data: strData,
  };

  objDados.rendas.push (novaRenda);

  salvaDados(objDados);

  imprimeDados();
}

function excluiDados(){

  
}

function imprimeDados( ){
  let tela = document.getElementById('tela');
  let strHtml = '';
  let objDados = leDados ();
  for (i = 0; i < objDados.rendas.length; i++){
      strHtml += `<p>${objDados.rendas[i].pagamento} - ${objDados.rendas[i].data} </p>`;
  }

  tela.innerHTML = strHtml;
}

//Configura os botoes
document.getElementById ('btnImprime').addEventListener ('click', imprimeDados);
document.getElementById ('btnEditar').addEventListener ('click', editarDados);
document.getElementById ('btnExcluir').addEventListener ('click', excluiDados);
