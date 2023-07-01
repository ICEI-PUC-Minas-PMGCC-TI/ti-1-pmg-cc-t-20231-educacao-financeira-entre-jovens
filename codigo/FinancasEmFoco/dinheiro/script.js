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


  //grafico

  document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById("username-input");
    var passwordInput = document.getElementById("password-input");
    var loginButton = document.getElementById("login-button");
    var loginBar = document.querySelector(".login-bar");
  
    loginButton.addEventListener("click", function() {
      var username = usernameInput.value;
      var password = passwordInput.value;
      
      loginBar.innerHTML = "Bem-vindo, " + username + "! <button id='logout-button'>Logout</button>";
  
      var logoutButton = document.getElementById("logout-button");
      logoutButton.addEventListener("click", function() {
        loginBar.innerHTML = `<input type="text" id="username-input" placeholder="Nome de usuário">
        <input type="password" id="password-input" placeholder="Senha">
        <button id="login-button">Login</button>`;
    
  
        usernameInput = document.getElementById("username-input");
        passwordInput = document.getElementById("password-input");
        loginButton = document.getElementById("login-button");
        loginBar = document.querySelector(".login-bar");
      });
    });
  });
  am5.ready(function() {
    var dados = {
      Faculdade: 1800,
      Aluguel: 1000,
      Alimentacao: 500,
      Jogos: 900,
      Transporte: 80,
      Restante: 0,
    };
  
    function atualizarGrafico() {
      var root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);
  
      var chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));
  
      var series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category"
      }));
  
      for (var key in dados) {
        if (key !== "Restante") {
          series.data.push({ value: dados[key], category: key });
        }
      }
  
      series.appear(1000, 100);
    }
  
    function atualizarSalario(novoSalario) {
      dados.Salario = novoSalario;
      dados.Restante = dados.Salario - dados.Alimentacao - dados.Aluguel - dados.Faculdade - dados.Jogos - dados.Transporte;
      atualizarGrafico();
      exibirAvisoGastosExcessivos();
    }
 
      function showWarning(message) {
    var warningDiv = document.getElementById("warningDiv");
    warningDiv.textContent = message;
    warningDiv.style.display = "block";
  }
  
  
    showWarning("Atenção! Seus gastos estão excessivos!");
  
    document.addEventListener("DOMContentLoaded", function() {
        var icons = document.querySelectorAll(".sidebar-menu i");
      
        for (var i = 0; i < icons.length; i++) {
          icons[i].classList.add("animate__animated", "animate__fadeInLeft");
        }
      });
      
  
    atualizarGrafico();
  
    var salarioInput = document.getElementById("salarioInput");
    salarioInput.addEventListener("input", function() {
      var novoSalario = parseFloat(salarioInput.value);
      if (!isNaN(novoSalario)) {
        atualizarSalario(novoSalario);
      }
    });
  });
  
  