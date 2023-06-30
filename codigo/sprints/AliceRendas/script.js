
function leDados(){
    let strDados = localStorage.getItem('db');
    let objDados = {};
    
    if (strDados){
      objDados = JSON.parse (strDados);
    } else {
      objDados = { rendas : [ 
        {renda_ativa: "2000,00", renda_passiva: "1500,00", renda_vitalicia: "540,00"}, 
        {renda_ativa: "4500,00", renda_passiva: "150,00", renda_vitalicia: "600,00"}, 
        {renda_ativa: "8400,00", renda_passiva: "450,00", renda_vitalicia: "980,00"} ]
          }
    }
    return objDados;
  }
  
  function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
  }
  
  function editarDados(){
   let objDados = leDados();

   let strAtiva = document.getElementById ('ativa').value;
   let strPassiva = document.getElementById ('passiva').value;
   let strVitalicia = document.getElementById ('vitalicia').value;
    let novaRenda = {
        renda_ativa: strAtiva,
        renda_passiva: strPassiva,
        renda_vitalicia: strVitalicia
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
        strHtml += `<p>${objDados.rendas[i].renda_ativa} - ${objDados.rendas[i].renda_passiva} - ${objDados.rendas[i].renda_vitalicia} </p>`;
    }

    tela.innerHTML = strHtml;
  }

  //Configura os botoes
  document.getElementById ('btnImprime').addEventListener ('click', imprimeDados);
  document.getElementById ('btnEditar').addEventListener ('click', editarDados);
  document.getElementById ('btnExcluir').addEventListener ('click', excluiDados);
