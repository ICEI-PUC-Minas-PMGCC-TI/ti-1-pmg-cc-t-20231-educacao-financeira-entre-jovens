var selectedDate = null;
var pins = [];

// Load pins data from localStorage
var pinsData = localStorage.getItem("pins");
if (pinsData) {
  pins = JSON.parse(pinsData);
}

// grafico
function reloadPage() {
  location.reload();
}
 am5.ready( function grafico() {
  var dadosGastosJSON = localStorage.getItem("dadosGastos");
  var resultado2 = 0;
    if (dadosGastosJSON) {
      var dadosGastos = JSON.parse(dadosGastosJSON);
  
      for (var i = 0; i < dadosGastos.length; i++) {
        resultado2 = resultado2 + (dadosGastos[i].valor);
      }
    }

  var dadosRendaJSON = localStorage.getItem("dadosRendas");
  var resultado = 0;

  
    var dadosRenda = JSON.parse(dadosRendaJSON);
  if (dadosRendaJSON){
    for (var i = 0; i < dadosRenda.length; i++) {
      resultado = resultado + (dadosRenda[i].valor); 
    }
  }

  var lucro = resultado - resultado2;
    console.log(dadosRenda);

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
    value: lucro
  }, {
    month: "Agosto",
    value: 0
  }, {
    month: "Setembro",
    value: 0
  }, {
    month: "Outubro",
    value: 0
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
  reloadPage();
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
      valor: parseFloat(valorRenda)
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

// calendario



function pinOnCalendar() {
  var dateInput = document.getElementById("date");
  var nameInput = document.getElementById("name");
  var valorInput = document.getElementById("valor");

  var dateValue = dateInput.value;
  var nameValue = nameInput.value;
  var valorValue = valorInput.value;

  var date = new Date(dateValue + "T00:00:00");
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  var pin = {
    date: new Date(year, month, day),
    name: nameValue,
    valor: valorValue,
  };

  pins.push(pin);

  if (selectedDate && selectedDate.getTime() === pin.date.getTime()) {
    selectedDate = null;
  } else {
    selectedDate = pin.date;
  }
  
  renderCalendar();
renderPins();

// Clear input values
dateInput.value = "";
nameInput.value = "";
valorInput.value = "";

// Save pins data to localStorage
localStorage.setItem("pins", JSON.stringify(pins));
}

function previousMonth() {
  var currentDate = new Date(selectedDate);
  currentDate.setMonth(currentDate.getMonth() - 1);
  selectedDate = currentDate;
  renderCalendar();
  renderPins();
}

function nextMonth() {
  var currentDate = new Date(selectedDate);
  currentDate.setMonth(currentDate.getMonth() + 1);
  selectedDate = currentDate;
  renderCalendar();
  renderPins();
}

function renderCalendar() {
  var calendar = document.getElementById("calendar");
  var tbody = calendar.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  var currentDate = selectedDate ? new Date(selectedDate) : new Date();

  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  document.getElementById("monthYear").innerText = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

  var firstDay = new Date(year, month, 1);
  var lastDay = new Date(year, month + 1, 0);

  var numRows = Math.ceil((lastDay.getDate() + firstDay.getDay()) / 7);
  var dayCounter = 1;

  for (var i = 0; i < numRows; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      if (i === 0 && j < firstDay.getDay()) {
        cell.innerHTML = "";
      } else if (dayCounter > lastDay.getDate()) {
        cell.innerHTML = "";
      } else {
        cell.innerHTML = dayCounter;
        cell.addEventListener("click", onDateClick);

        var pin = pins.find(function(pin) {
          var pinDate = new Date(pin.date);
          return pinDate.getFullYear() === year && pinDate.getMonth() === month && pinDate.getDate() === dayCounter;
        });

        if (pin) {
          cell.classList.add("pin");
        }

        dayCounter++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
  }
}

function renderPins() {
  var selectedDateContainer = document.getElementById("selectedDate");
  selectedDateContainer.innerHTML = "";

  if (selectedDate) {
    var selectedDateText = document.createElement("h3");
    selectedDateText.innerText = "Data Selecionada: " + selectedDate.toDateString();
    selectedDateContainer.appendChild(selectedDateText);

    var pinsForDate = pins.filter(function (pin) {
      return (
        pin.date.getTime() === selectedDate.getTime() &&
        pin.date.getMonth() === selectedDate.getMonth() &&
        pin.date.getFullYear() === selectedDate.getFullYear()
      );
    });

    if (pinsForDate.length > 0) {
      var pinsList = document.createElement("ul");
      pinsForDate.forEach(function (pin, index) {
        var listItem = document.createElement("li");
        var pinInfo = document.createElement("span");
        pinInfo.innerText =
          pin.name + ": " + pin.valor + " - " + pin.date.toDateString();

        // Add delete button
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", function () {
          removePinByIndex(index);
        });

        listItem.appendChild(pinInfo);
        listItem.appendChild(deleteButton);
        pinsList.appendChild(listItem);
      });
      selectedDateContainer.appendChild(pinsList);
    } else {
      var noPinsMessage = document.createElement("p");
      noPinsMessage.innerText = "Nenhum pagamento agendado.";
      selectedDateContainer.appendChild(noPinsMessage);
    }
  }
}
function onDateClick(event) {
  var clickedDate = parseInt(event.target.innerHTML);
  var currentDate = selectedDate ? new Date(selectedDate) : new Date();
  currentDate.setDate(clickedDate);
  selectedDate = currentDate;
  renderCalendar();
  renderPins();
}

function removePinByIndex(index) {
  if (index >= 0 && index < pins.length) {
    pins.splice(index, 1);
    renderCalendar();
    renderPins();
    saveCalendarData();
  }
}

function saveCalendarData() {
  // Convert the date objects to strings before saving to local storage
  var pinsData = JSON.stringify(
    pins.map(function(pin) {
      return {
        date: pin.date.getTime(),
        name: pin.name,
        valor: pin.valor
      };
    })
  );

  localStorage.setItem("pins", pinsData);
}

function loadCalendarData() {
  // Load existing calendar data from localStorage
  var pinsData = localStorage.getItem("pins");
  if (pinsData) {
    pins = JSON.parse(pinsData);

    // Convert date strings to Date objects
    pins.forEach(function(pin) {
      pin.date = new Date(pin.date);
    });

    // Check if selectedDate is in the loaded pins data
    var selectedDateInPins = pins.find(function(pin) {
      return (
        selectedDate &&
        pin.date &&
        pin.date.getTime() === selectedDate.getTime()
      );
    });

    if (!selectedDateInPins) {
      // If selectedDate is not found, set it to the date of the first pin
      selectedDate = pins[0] ? pins[0].date : null;
    }
  }

  // Render calendar and pins
  renderCalendar();
  renderPins();
}



// Load existing calendar data from localStorage and render the calendar
loadCalendarData();
// Initial rendering
renderCalendar();
renderPins();
