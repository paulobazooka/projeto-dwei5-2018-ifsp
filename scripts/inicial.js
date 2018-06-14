$(document).ready(function () {

    var baseDados;
	var nomeValido = false;
	var idadeValida = false;
	var cpfValido = false;
	var registroValido = false;
	var senhaValida = false;

	$('#btnCadastrar').prop('disabled', 'disabled');
	$('#id').prop('disabled', 'disabled');

	// validar o campo nome
	$('#nome').blur(function(){
    	var nome = $(this).val();
    	if(nome.length > 255){
    		$('#lblNome').text("O nome do candidato deve ter no máximo 255 caracteres!");
    	}else{
    		nomeValido = true;
    		validarCampos();
    	}
	}); 

	// validar a idade do candidato
	$('#dtNasc').blur(function() {
		var dataAtual = new Date();
		var dataNasc  = new Date($(this).val());

		var anoAtual = dataAtual.getFullYear();
		var mesAtual = dataAtual.getMonth() + 1;
		var diaAtual = dataAtual.getDate();

		if(anoAtual > dataNasc.getFullYear()){
			if((dataAtual.getFullYear() - dataNasc.getFullYear()) < 18){
				$('#lblDtNasc').attr('class','label-danger');
				$('#lblDtNasc').text("Candidato menor de idade!");
			}
			}else {
				$('#lblDtNasc').text("");
				idadeValida = true;
				validarCampos();
			}
	});


	// validar cpf
    $('#cpf').blur(function(){
        var cpf = $('#cpf').val().replace(/[^0-9]/g, '').toString();

        if( cpf.length == 11 ){
            var v = [];

            //Calcula o primeiro dígito de verificação.
            v[0] = 1 * cpf[0] + 2 * cpf[1] + 3 * cpf[2];
            v[0] += 4 * cpf[3] + 5 * cpf[4] + 6 * cpf[5];
            v[0] += 7 * cpf[6] + 8 * cpf[7] + 9 * cpf[8];
            v[0] = v[0] % 11;
            v[0] = v[0] % 10;

            //Calcula o segundo dígito de verificação.
            v[1] = 1 * cpf[1] + 2 * cpf[2] + 3 * cpf[3];
            v[1] += 4 * cpf[4] + 5 * cpf[5] + 6 * cpf[6];
            v[1] += 7 * cpf[7] + 8 * cpf[8] + 9 * v[0];
            v[1] = v[1] % 11;
            v[1] = v[1] % 10;

            //Retorna Verdadeiro se os dígitos de verificação são os esperados.
            if ( (v[0] != cpf[9]) || (v[1] != cpf[10]) ){
                $('#lblCpf').text("CPF inválido!");

                $('#cpf').val('');
                $('#cpf').focus();
            }else{
            	cpfValido = true;
            	validarCampos();
            }
        }
        else{
            $('#lblCpf').text("CPF inválido!");
            $('#cpf').val('');
            $('#cpf').focus();
        }
    });


    // validar campo de registro
    $('#cadjus').blur(function(){
    	var registro = $(this).val();
    	if(registro > 0 && registro <= 500){
    		$('#lblRegistro').text("");
    		registroValido = true;
    		validarCampos();
    	}else{
    		$('#lblRegistro').text("Registro Inválido!");
    	}
    });


    // permitir apenas os campos específicos com números
    $(".campoNumero").bind("keyup blur focus", function(e) {
        e.preventDefault();
        var expre = /[^\d]/g;
        $(this).val($(this).val().replace(expre,''));
    });


    // validar a senha
    $('#confirmaSenha').blur(function(event) {
    	var senha1 = $('#senha').val();
    	var senha2 = $(this).val();

    	if(senha1 == senha2){
    		$('#lblSenha').text("");
    		senhaValida = true;
    		validarCampos();
    	}else {
    		$('#lblSenha').text("Senha Inválida!");
    	}
    });
});

function validarCampos(){
	if(nomeValido && idadeValida && cpfValido && registroValido && senhaValida){
		$('#btnCadastrar').removeProp('disabled');
	}
}



