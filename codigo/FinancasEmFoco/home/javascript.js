// grafico
am5.ready(function () {

  // Create root element
  var root = am5.Root.new("chartdiv");
  // Set themes
  root.setThemes([
    am5themes_Animated.new(root)
  ]);


  // Create chart
  var chart = root.container.children.push(am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
    pinchZoomX: true
  }));

  // Add cursor
  var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  cursor.lineY.set("visible", false);


  // Create axes
  var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  xRenderer.labels.template.setAll({
    rotation: -90,
    centerY: am5.p50,
    centerX: am5.p100,
    paddingRight: 15
  });

  xRenderer.grid.template.setAll({
    location: 1
  })

  var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
    maxDeviation: 0.3,
    categoryField: "month",
    renderer: xRenderer,
    tooltip: am5.Tooltip.new(root, {})
  }));

  var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
    maxDeviation: 0.3,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })
  }));

  // Create series
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: "Series 1",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    sequencedInterpolation: true,
    categoryXField: "month",
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  }));
  series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
  series.columns.template.adapters.add("fill", function (fill, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });
  series.columns.template.adapters.add("stroke", function (stroke, target) {
    return chart.get("colors").getIndex(series.columns.indexOf(target));
  });


  // Set data
  var data = [{
    month: "Dezembro",
    value: 500
  }, {
    month: "Janeiro",
    value: 100
  }, {
    month: "Fevereiro",
    value: -200
  }, {
    month: "Março",
    value: -524
  }, {
    month: "Abril",
    value: 324
  }, {
    month: "Maio",
    value: 254
  }, {
    month: "Junho",
    value: -100 
  }, {
    month: "Julho",
    value: 711
  }, {
    month: "Agosto",
    value: 60
  }, {
    month: "Setembro",
    value: -25
  }, {
    month: "Outubro",
    value: -62
  },



];

  xAxis.data.setAll(data);
  series.data.setAll(data);

  // Make stuff animate on load
  series.appear(1000);
  chart.appear(1000, 100);

});


// lista rendas

function adicionarRenda() {
  var nomeRenda = document.getElementById("nomeRenda").value;
  var valorRenda = document.getElementById("valorRenda").value;

  if (nomeRenda !== "" && valorRenda !== "") {
    var renda = {
      nome: nomeRenda,
      valor: parseFloat(valorRenda)
    };

    adicionarNaLista(renda);
    salvarDadosNoLocalStorage();
    limparCampos();
  }
}

function removerDaLista(item) {
  var lista = document.getElementById("rendas");
  lista.removeChild(item);

  salvarDadosNoLocalStorage();
}

function limparLista() {
  var lista = document.getElementById("rendas");
  var itens = lista.getElementsByTagName("li");

  var itensArray = Array.from(itens);

  for (var i = 0; i < itensArray.length; i++) {
    lista.removeChild(itensArray[i]);
  }

  salvarDadosNoLocalStorage();
}

function adicionarNaLista(renda) {
  var lista = document.getElementById("rendas");

  var item = document.createElement("li");
  item.textContent = renda.nome + " - R$ " + renda.valor.toFixed(2);

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
  var lista = document.getElementById("rendas");
  var items = Array.from(lista.getElementsByTagName("li"));

  var dadosRenda = [];

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var textoItem = item.textContent;

    var nomeRenda = textoItem.split(" - R$ ")[0];
    var valorRenda = parseFloat(textoItem.split(" - R$ ")[1]);

    var renda = {
      nome: nomeRenda,
      valor: valorRenda
    };

    dadosRenda.push(renda);
  }

  var dadosRendaJSON = JSON.stringify(dadosRenda);

  localStorage.setItem("dadosRendas", dadosRendaJSON);
}

carregarDadosDoLocalStorage();

function carregarDadosDoLocalStorage() {
  var dadosRendaJSON = localStorage.getItem("dadosRendas");

  if (dadosRendaJSON) {
    var dadosRenda = JSON.parse(dadosRendaJSON);

    for (var i = 0; i < dadosRenda.length; i++) {
      adicionarNaLista(dadosRenda[i]);
    }
  }
}

function limparCampos() {
  document.getElementById("nomeRenda").value = "";
  document.getElementById("valorRenda").value = "";
}