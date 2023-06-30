function calcularParcelas() {
    var valorTotal = parseFloat(document.getElementById('valorTotal').value);
    var numParcelas = parseInt(document.getElementById('numParcelas').value);
    
    var valorParcela = valorTotal / numParcelas;
    
    document.getElementById('resultadoParcelas').innerHTML = "Valor de cada parcela: R$" + valorParcela.toFixed(2);
  }

  function calcularJurosSimples() {
    var valorPrincipal = parseFloat(document.getElementById('valorPrincipal').value);
    var taxaJuros = parseFloat(document.getElementById('taxaJuros').value);
    var periodo = parseInt(document.getElementById('periodo').value);
    
    var jurosSimples = (valorPrincipal * taxaJuros * periodo) / 100;
    var montanteSimples = valorPrincipal + jurosSimples;
    
    document.getElementById('resultadoSimples').innerHTML = "Montante (Juros Simples): R$" + montanteSimples.toFixed(2);
  }
  
  function calcularJurosCompostos() {
    var valorPrincipal = parseFloat(document.getElementById('valorPrincipal').value);
    var taxaJuros = parseFloat(document.getElementById('taxaJuros').value);
    var periodo = parseInt(document.getElementById('periodo').value);
    
    var montanteComposto = valorPrincipal * Math.pow((1 + taxaJuros / 100), periodo);
    var jurosCompostos = montanteComposto - valorPrincipal;
    
    document.getElementById('resultadoComposto').innerHTML = "Montante (Juros Compostos): R$" + montanteComposto.toFixed(2);
    document.getElementById('jurosCompostos').innerHTML = "Juros (Juros Compostos): R$" + jurosCompostos.toFixed(2);
  }

  function limparResultados() {
    document.getElementById('resultadoParcelas').innerHTML = "";
    document.getElementById('resultadoSimples').innerHTML = "";
    document.getElementById('resultadoComposto').innerHTML = "";
    document.getElementById('jurosCompostos').innerHTML = "";
  }

  function leDados() {
    let strDados = localStorage.getItem('db3');
    let objDados = {};
  
    if (strDados) {
      objDados = JSON.parse(strDados);
    } else {
      objDados = {
        limite: [
          
        ]
      };
    }
  
    return objDados;
  }
  
  function salvaDados (dados3) {
    localStorage.setItem ('db3', JSON.stringify (dados3));
  }
  
  function incluirLimite() {
    // Ler os dados do localStorage
    let objDados = leDados();
  
    // Incluir um novo limite
    let nameInput = document.getElementById('name');
    let valueInput = document.getElementById('value');
    let name = nameInput.value;
    let value = valueInput.value;
    let novoLimite = {
      name: name,
      value: value
    };
    objDados.limite.push(novoLimite);
  
    // Salvar os dados no localStorage novamente
    salvaDados(objDados);
  
    // Limpar os campos de input
    nameInput.value = '';
    valueInput.value = '';
  
    // Atualiza os dados da tela
    mostrarDados();
  }
  
  function mostrarDados() {
    let tela = document.getElementById('tela');
    let objDados = leDados();
    let strHtml = '';
  
    for (let i = 0; i < objDados.limite.length; i++) {
      let name = objDados.limite[i].name;
      let value = objDados.limite[i].value;
      strHtml += `<p> ${name} - R$${value},00</p>`;
      strHtml += `<button onclick="removerDado(${i})">Remover</button>`;
    }
  
    tela.innerHTML = strHtml;
  }
  
  function removerDado(index) {
    let objDados = leDados();
    objDados.limite.splice(index, 1);
    salvaDados(objDados);
    mostrarDados();
  }
  
  window.addEventListener('load', mostrarDados);
  
  document.getElementById('salvarLimite').addEventListener('click', incluirLimite);
  