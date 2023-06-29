let nomeDoGasto = document.querySelector('#nomeDoGasto');
let labelNomeDoGasto = document.querySelector('#labelNomeDoGasto');
let validNomeDoGasto = false;

let valorDoGasto = document.querySelector('#valorDoGasto');
let labelValorDoGasto = document.querySelector('#labelValorDoGasto');
let validValorDoGasto = false;

let categoria = document.querySelector('#categoria');
let labelCategoria = document.querySelector('#labelCategoria');
let validCategoria = false;

let dataDoGasto = document.querySelector('#dataDoGasto');
let labelDataDoGasto = document.querySelector('#labelDataDoGasto');
let validDataDoGasto = false;

let msgError = document.querySelector('#msgError')
let msgSucess = document.querySelector('#msgSuccess')

nomeDoGasto.addEventListener('keyup', () => {
    if (nomeDoGasto.value.length <= 2) {
        labelNomeDoGasto.setAttribute('style', 'color: red');
        labelNomeDoGasto.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
        nomeDoGasto.setAttribute('style', 'border-color: red');
        validNomeDoGasto = false;
    } else {
        labelNomeDoGasto.setAttribute('style', 'color: green');
        labelNomeDoGasto.innerHTML = 'Nome';
        nomeDoGasto.setAttribute('style', 'border-color: green');
        validNomeDoGasto = true;
    }
});

valorDoGasto.addEventListener('keyup', () => {
    let numberPattern = /\d+/g;

    if (valorDoGasto.value.length < 1 || !valorDoGasto.value.match(numberPattern)) {
        labelValorDoGasto.setAttribute('style', 'color: red');
        labelValorDoGasto.innerHTML = 'Valor do gasto *Insira apenas números formato 9.99 (separador ponto .)';
        valorDoGasto.setAttribute('style', 'border-color: red');
        validValorDoGasto = false;
    } else {
        labelValorDoGasto.setAttribute('style', 'color: green');
        labelValorDoGasto.innerHTML = 'Valor do gasto';
        valorDoGasto.setAttribute('style', 'border-color: green');
        validValorDoGasto = true;
    }
});

categoria.addEventListener('keyup', () => {
    if (categoria.value.length <= 2) {
        labelCategoria.setAttribute('style', 'color: red');
        labelCategoria.innerHTML = 'Categoria *Insira no mínimo 3 caracteres';
        categoria.setAttribute('style', 'border-color: red');
        validCategoria = false;
    } else {
        labelCategoria.setAttribute('style', 'color: green');
        labelCategoria.innerHTML = 'Categoria';
        categoria.setAttribute('style', 'border-color: green');
        validCategoria = true;
    }
});

dataDoGasto.addEventListener('keyup', () => {
    if (dataDoGasto.value.length <= 9) {
        labelDataDoGasto.setAttribute('style', 'color: red');
        labelDataDoGasto.innerHTML = 'Data do gasto *Insira uma data no formato 00/00/0000';
        dataDoGasto.setAttribute('style', 'border-color: red');
        validDataDoGasto = false;
    } else {
        labelDataDoGasto.setAttribute('style', 'color: green');
        labelDataDoGasto.innerHTML = 'Data do gasto';
        dataDoGasto.setAttribute('style', 'border-color: green');
        validDataDoGasto = true;
    }
});


function cadastrar() {
    if (validNomeDoGasto && validValorDoGasto && validCategoria && validDataDoGasto) {

        let listaGasto = JSON.parse(localStorage.getItem('listaGasto') || '[]');

        listaGasto.push(
            {
                nomeCad: nomeDoGasto.value,
                valorCad: valorDoGasto.value,
                categoriaCad: categoria.value,
                dataCad: dataDoGasto.value
            }
        )

        localStorage.setItem('listaGasto', JSON.stringify(listaGasto))

        msgSucess.setAttribute('style', 'display: block');
        msgSucess.innerHTML = '<strong>Cadastrando valor do gasto...</strong>';
        msgError.setAttribute('style', 'display: none');
        msgError.innerHTML = '';
        
        setTimeout(() => {
            window.location.href = 'telaGasto.html';
        }, 3000);
        
    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
        msgSucess.innerHTML = '';
        msgSucess.setAttribute('style', 'display: none');
    }
}

function mascaraData( campo, e )
{
	let kC = e.keyCode;
	let data = campo.value;
	
	if( kC!=8 && kC!=46 )
	{
		if( data.length==2 )
		{
			campo.value = data += '/';
		}
		else if( data.length==5 )
		{
			campo.value = data += '/';
		}
		else
			campo.value = data;
	}
}