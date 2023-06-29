function adicionarGasto() {
    var nomeGasto = document.getElementById("nomeGasto").value;
    var valorGasto = document.getElementById("valorGasto").value;
  
    if (nomeGasto !== "" && valorGasto !== "") {
      var gasto = {
        nome: nomeGasto,
        valor: parseFloat(valorGasto)
      };
  
      adicionarNaLista(gasto);
      salvarDadosNoLocalStorage();
      limparCampos();
    }
  }
  
  function removerDaLista(item) {
    var lista = document.getElementById("gastos");
    lista.removeChild(item);
  
    salvarDadosNoLocalStorage();
  }
  
  function limparLista() {
    var lista = document.getElementById("gastos");
    var itens = lista.getElementsByTagName("li");
  
    var itensArray = Array.from(itens);
  
    for (var i = 0; i < itensArray.length; i++) {
      lista.removeChild(itensArray[i]);
    }
  
    salvarDadosNoLocalStorage();
  }
  
  function adicionarNaLista(gasto) {
    var lista = document.getElementById("gastos");
  
    var item = document.createElement("li");
    item.textContent = gasto.nome + " - R$ " + gasto.valor.toFixed(2);
  
    var btnExcluir = document.createElement("button");
    btnExcluir.textContent = "X";
    btnExcluir.addEventListener("click", function() {removerDaLista(item);});
  
    item.appendChild(btnExcluir);
  
    lista.appendChild(item);
  
    var items = Array.from(lista.getElementsByTagName("li"));
    items.sort(function(a, b) {
      var valorA = parseFloat(a.textContent.split(" - R$ ")[1]);
      var valorB = parseFloat(b.textContent.split(" - R$ ")[1]);
      return valorB - valorA;
    });
  
    for (var i = 0; i < items.length; i++) {
      lista.appendChild(items[i]);
    }
  }
  
  function salvarDadosNoLocalStorage() {
    var lista = document.getElementById("gastos");
    var items = Array.from(lista.getElementsByTagName("li"));
  
    var dadosGastos = [];
  
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var textoItem = item.textContent;
  
      var nomeGasto = textoItem.split(" - R$ ")[0];
      var valorGasto = parseFloat(textoItem.split(" - R$ ")[1]);
  
      var gasto = {
        nome: nomeGasto,
        valor: valorGasto
      };
  
      dadosGastos.push(gasto);
    }
  
    var dadosGastosJSON = JSON.stringify(dadosGastos);
  
    localStorage.setItem("dadosGastos", dadosGastosJSON);
  }
  
  carregarDadosDoLocalStorage();
  
  function carregarDadosDoLocalStorage() {
    var dadosGastosJSON = localStorage.getItem("dadosGastos");
  
    if (dadosGastosJSON) {
      var dadosGastos = JSON.parse(dadosGastosJSON);
  
      for (var i = 0; i < dadosGastos.length; i++) {
        adicionarNaLista(dadosGastos[i]);
      }
    }
  }
  
  function limparCampos() {
    document.getElementById("nomeGasto").value = "";
    document.getElementById("valorGasto").value = "";
  }
  