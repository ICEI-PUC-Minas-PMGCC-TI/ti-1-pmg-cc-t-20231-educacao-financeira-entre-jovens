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
