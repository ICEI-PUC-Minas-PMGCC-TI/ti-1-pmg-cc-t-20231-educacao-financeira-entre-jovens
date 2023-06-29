function limparResultados() {
  document.getElementById('resultadoParcelas').innerHTML = "";
  document.getElementById('resultadoSimples').innerHTML = "";
  document.getElementById('resultadoComposto').innerHTML = "";
  document.getElementById('jurosCompostos').innerHTML = "";
}
function salvarResultados() {
    var resultados = "";
  
    var resultadoParcelas = document.getElementById('resultadoParcelas').innerHTML;
    var resultadoSimples = document.getElementById('resultadoSimples').innerHTML;
    var resultadoComposto = document.getElementById('resultadoComposto').innerHTML;
    var jurosCompostos = document.getElementById('jurosCompostos').innerHTML;
  
    if (resultadoParcelas) {
      resultados += "Parcelas: " + resultadoParcelas + "<br>";
    }
  
    if (resultadoSimples) {
      resultados += "Juros Simples: " + resultadoSimples + "<br>";
    }
  
    if (resultadoComposto) {
      resultados += "Juros Compostos: " + resultadoComposto + "<br>";
    }
  
    if (jurosCompostos) {
      resultados += "Juros Compostos: " + jurosCompostos + "<br>";
    }
  
    document.getElementById('resultadosSalvos').innerHTML = resultados;
  
    // Salvar resultados no Armazenamento Local
    localStorage.setItem('resultadosSalvos', resultados);
  }
  
  function apagarResultados() {
    document.getElementById('resultadosSalvos').innerHTML = "";
  
    // Remover resultados do Armazenamento Local
    localStorage.removeItem('resultadosSalvos');
  }
  
  function recuperarResultados() {
    var resultadosSalvos = localStorage.getItem('resultadosSalvos');
  
    if (resultadosSalvos) {
      document.getElementById('resultadosSalvos').innerHTML = resultadosSalvos;
    }
  }
  
  window.addEventListener('load', recuperarResultados);
  
