
function validaLogin() {
    let userTxt = localStorage.getItem("userLogged")

    if(!userTxt) {
        window.location = "index.html";
    }

    let user = JSON.parse(userTxt)

    document.getElementById("dadosUser").innerHTML = `${user.nome} <br> ${user.racf}`
    document.getElementById("fotoUser").innerHTML = `<img src="${user.linkFoto}" width="60" height="60" class="mr-3" alt="...">`

    listarEvento()
 }

 function listarEvento() {
    let url = `http://localhost:8080/evento/all` 

    fetch(url)
    .then(res => res.json())
    .then(res => exibirAlarme(res))
}


function gerarRelatorioEventos(pg) {

    let dataini = document.getElementById("dtinicio").value;
    let datafim = document.getElementById("dtfinal").value;

    let dataMsg = {
        dt1: dataini,
        dt2: datafim,
        pg: pg
    }

    let msg = {
        method: 'POST',
        body: JSON.stringify(dataMsg),
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch("http://localhost:8080/evento/data", msg)
        .then(res => res.json())
        .then(res => preencheEventos(res));
}


function preencheEventos(res) {
    console.log(res);
    let tabelaEventos = '<table class="table table-sm"> <tr> <th>Equipamento</th> <th>Alarme</th> <th>Data</th> </tr>';

    for (i = 0; i < res.length; i++) {
        let dataAtual = new Date(res[i].dataevt).toLocaleDateString("pt-BR", { timeZone: 'UTC' })

        tabelaEventos = tabelaEventos + `<tr> 
                        <td> ${res[i].equipamento.hostname} </td> 
                        <td> ${res[i].alarme.descricao} </td> 
                        <td> ${dataAtual} </td> 
              </tr>`;
    }

    tabelaEventos += '</table>';
    document.getElementById("tabelaEV").innerHTML = tabelaEventos;

}