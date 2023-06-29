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