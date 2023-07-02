function reloadPage() {
  location.reload();
}
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
      reloadPage();
    }
  }
  
  function removerDaLista(item) {
    var lista = document.getElementById("gastos");
    lista.removeChild(item);
  
    salvarDadosNoLocalStorage();
    reloadPage();
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

  var teste = localStorage.getItem("dadosGastos");
  
  
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


  //grafico
  console.log(teste);

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chartdiv");
    
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      layout: root.verticalLayout
    }));
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      
      categoryField: "nome",
      valueField: "valor"
    }));
    
    
    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    var array = JSON.parse(teste);
 
    console.log(array);
    
    
   
    series.data.setAll(array);
    console.log(series.data);
    
    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear(1000, 100);
    
    }); // end am5.ready()
  
  