$(document).ready(function () {
   
   $('#btnAlterar').click(function(event) {
   		alterarCadastro();
   });

   $('#btnApagar').click(function(event) {
   	    $('#confirmaDelete').modal('show');
   	    $('#lblCandidato').html($('#nomeCandidato').val());
   });

   $('#btnApagarConta').click(function(event) {
   		console.log('Apagar conta');
   		apagarCandidato();
   });

});


function clicou(id){

 $.get("http://andrebordignon.esy.es/php/consultacandidatos.php", function(respostaSolicitação){
        
        var obj = JSON.parse(respostaSolicitação); 
        console.log(obj)
             
        // laço para incrementar
        for(var i=0; i < obj.length; i++){              
            if(obj[i].idcandidato == id){
            	
 				$('#idcandidato').val(obj[i].idcandidato); 
 				$('#idcandidato').attr('disabled', 'disabled');
 				$('#nomeCandidato').val(obj[i].nome);
 				$('#dtNascimento').val(obj[i].datanasc); 

 				if(obj[i].sexo.indexOf("asc") != -1){
 				   $('#sexoCandidato option:contains("Masculino")').attr('selected', true);
 				}else {
 					if(obj[i].sexo.indexOf("em") != -1){
 						 $('#sexoCandidato option:contains("Feminino")').attr('selected', true);
 					}else {
 						 $('#sexoCandidato option:contains("Não Declarar")').attr('selected', true);
 					}
 				}
 						
 				$('#cpfCandidato').val(obj[i].cpf);
 				$('#ruaCandidato').val(obj[i].rua);
 				$('#numeroCandidato').val(obj[i].numero);
 				$('#estado').val(obj[i].estado);
 				$('#cidade').val(obj[i].cidade);
 				$('#email').val(obj[i].email);
 				$('#cadjus').val(obj[i].cadjus);
 				$('#senha').val(obj[i].senha);	           
            }
        }
 });       

	$('#modal').modal('show');	
}


function alterarCadastro(){
	$.ajax({
		url: 'http://andrebordignon.esy.es/php/atualizacandidato.php',
		type: 'post',
		data : {
            idcandidato : $('#idcandidato').val(),
            nome   : $('#nomeCandidato').val(),
            email  : $('#email').val(),
            senha  : $('#senha').val(),
            sexo   : $('#sexoCandidato').val(),
            cadjus : $('#cadjus').val(),
            rua    : $('#ruaCandidato').val(),
            numero : $('#numeroCandidato').val(),
            cidade : $('#cidade').val(),
            estado : $('#estado').val(),
            cpf    : $('#cpfCandidato').val(),
            dataNasc : $('#dtNascimento').val()
        },
        beforeSend : function(){
           console.log("ENVIANDO...");
        }
    })
    .done(function(msg){
          console.log("DONE: " + msg);
          limparCampos();
          alert("Candidato Atualizado com sucesso!");
          $('#modal').modal('hide');
          location.reload();
    })
    .fail(function(jqXHR, textStatus, msg){
        alert("FAIL - msg: " + msg + "\ntextStatus: " + textStatus + "\njqXHR: " + jqXHR);
        limparCampos();
        $('#modal').modal('hide');
        location.reload();
    }); 
}


function limparCampos(){
	$('#nomeCandidato').val('');
  $('#dtNascimento').val('');
  $('#sexoCandidato').val('');
  $('#cpfCandidato').val('');
  $('#rua').val('');
  $('#numero').val('');
  $('#cidade').val('');
  $('#estado').val('');
  $('#email').val('');
  $('#cadjus').val('');
  $('#senha').val('');
}



function apagarCandidato(){
	
	var string = 'http://andrebordignon.esy.es/php/deletacandidato.php?idcandidato=' + $('#idcandidato').val();
	
	$.ajax({
		url: string,
	})
	.done(function() {
		alert("Usuário APAGADO com sucesso!")
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		$('#confirmaDelete').modal('hide');
   		$('#modal').modal('hide');	
   		limparCampos();
   		location.reload();
	});
	
}