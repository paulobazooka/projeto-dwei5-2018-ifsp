$(document).ready(function () {


});



$.ajax({
        url : "http://andrebordignon.esy.es/php/incluicandidato.php",
        type : 'post',
        data : {
            nome   : "José da Silva Lopes",
            sexo   : "masculino",
            cadjus :'5000',
            rua    : 'Américo Vespúcio',
            bairro : 'Alamenda das Flores',
            cidade : 'Campinas',
            estado : 'São Paulo',
            cpf    : '32145698745',
            datanasc : '1975-02-15'

        },
        beforeSend : function(){
            $("#resultado").html("ENVIANDO...");
        }
	})
    .done(function(msg){
        $("#resultado").html(msg);
    })
    .fail(function(jqXHR, textStatus, msg){
        alert(msg);
    }); 