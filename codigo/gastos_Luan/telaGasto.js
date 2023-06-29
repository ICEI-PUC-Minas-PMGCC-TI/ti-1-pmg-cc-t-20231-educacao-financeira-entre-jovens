
function carregarGastos (){
    
    listaGasto = JSON.parse(localStorage.getItem('listaGasto'));
    let str = '';
    listaGasto.forEach((item) => {
        
        str += `<label>Nome do gasto: ${item.nomeCad}</label><br>
        <label>Valor do gasto: ${item.valorCad}</label><br>
        <label>Categoria: ${item.categoriaCad}</label><br>
        <label>Data: ${item.dataCad}</label><br>
        <br>
            `;  
    });
    document.getElementById('conteudo').innerHTML = str;
}

carregarGastos ();

