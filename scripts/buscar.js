$(document).ready(function () {

    consultarBaseDados();
});



// Função para buscar na base de dados todos os candidatos cadastrados
function consultarBaseDados(){

    $.get("http://andrebordignon.esy.es/php/consultacandidatos.php", function(respostaSolicitação){
        
        var obj = JSON.parse(respostaSolicitação); 
        
        // função para ordenar os objetos por ordem alfabética
        obj.sort(function(a,b) {
            if(a.nome < b.nome) return -1;
            if(a.nome > b.nome) return 1;
            return 0;
        });

        var corpo = "";
        
        // laço para incrementar
        for(var i=0; i < obj.length; i++){              
            if(obj[i].nome != ''){
                var age = idade(new Date(obj[i].datanasc), new Date());
                if(age > 0){        
                    corpo += '<tr><td>' + obj[i].idcandidato + "</td><td>" + obj[i].nome + "</td><td>" + age + '</td><td><button id=' + obj[i].idcandidato + ' class="btn btn-sm btn-warning editar" onclick="clicou(' + obj[i].idcandidato + ');"><span class="glyphicon glyphicon-pencil"></span></button></td><tr>';
                }
            }
        }

        $('#candidatos').html(corpo);
    });   
}



function idade(dataNascimento) {
    
    ano_aniversario = dataNascimento.getFullYear();
    mes_aniversario = dataNascimento.getMonth();
    dia_aniversario = dataNascimento.getDate();
    
    var d = new Date,
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        ano_aniversario = +ano_aniversario,
        mes_aniversario = +mes_aniversario,
        dia_aniversario = +dia_aniversario,

        quantos_anos = ano_atual - ano_aniversario;

    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
        quantos_anos--;
    }

    return quantos_anos < 0 ? 0 : quantos_anos;
}
