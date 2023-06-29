function calcularParcelas() {
    var valorTotal = parseFloat(document.getElementById('valorTotal').value);
    var numParcelas = parseInt(document.getElementById('numParcelas').value);
    
    var valorParcela = valorTotal / numParcelas;
    
    document.getElementById('resultadoParcelas').innerHTML = "Valor de cada parcela: R$" + valorParcela.toFixed(2);
  }