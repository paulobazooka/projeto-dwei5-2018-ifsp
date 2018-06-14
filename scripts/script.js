$(document).ready(function () {

	consultarBaseDados();

});


// Função para buscar na base de dados todos os candidatos cadastrados
function consultarBaseDados(){

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("GET", 'http://andrebordignon.esy.es/php/consultacandidatos.php', true);
    xmlRequest.send();

    xmlRequest.onreadystatechange = function () {        
        if(xmlRequest.readyState == XMLHttpRequest.DONE && xmlRequest.status == 200) {              
            var obj = JSON.parse(xmlRequest.responseText); 
            
            // função para ordenar os objetos por ordem alfabética
            obj.sort(function(a,b) {
			    if(a.nome < b.nome) return -1;
			    if(a.nome > b.nome) return 1;
			    return 0;
			});

            console.log(obj);
            var corpo = "";
            // laço para incrementar
			for(var i=0; i < obj.length; i++){				
				if(obj[i].nome != ''){
					var age = calculaIdade(new Date(obj[i].datanasc), new Date());
					if(age > 0){		
					// var idade = hoje - int(obj[i].datanasc.substring(start: 0, end: 4));	
						corpo += '<tr> <th>' + obj[i].nome + '<th> <th>' + age + '<th> <tr>';
					}
				}
			}

			$('#corpoTabela').html(corpo);

        } else {
            console.log('erro')
        }
    };
}



function calculaIdade(nascimento, hoje){
    return Math.floor(Math.ceil(Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)) / 365.25);
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



