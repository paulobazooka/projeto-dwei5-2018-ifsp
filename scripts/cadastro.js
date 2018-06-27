$(document).ready(function () {

    var baseDados;
    var nomeValido     = false;
    var idadeValida    = false;
    var cpfValido      = false;
    var registroValido = false;
    var senhaValida    = false;
    var emailValido    = false;

  //  $('#btnCadastrar').attr('disabled', 'disabled');
    $('#id').attr('disabled', 'disabled');

    // validar o campo nome
    $('#nome').change(function(){
        var nome = $(this).val();
        if(nome.length > 255){
            $('#lblNome').text("O nome do candidato deve ter no máximo 255 caracteres!");
            nomeValido = false;
        }else{
            $('#lblNome').text("");
            nomeValido = true;
        }
    }); 

    // validar a idade do candidato
    $('#dtNasc').change(function() {
        var dataAtual = new Date();
        var dataNasc  = new Date($(this).val());

        if(dataNasc.getFullYear() > dataAtual.getFullYear()){
            $('#lblDtNasc').attr('style', 'color: red');
            $('#lblDtNasc').text("Data Incorreta!");
            idadeValida = false; 
        }else{
            if(idade(dataNasc.getFullYear(), dataNasc.getMonth(), dataNasc.getDay()) < 18){
                $('#lblDtNasc').attr('style', 'color: red');
                $('#lblDtNasc').text("Candidato menor de idade!");
                idadeValida = false; 
            }else{
                $('#lblDtNasc').text("");
                $('#lblDtNasc').removeAttr('style');
                idadeValida = true; 
            }     
        }  
    });


    // validar e-mail
    $('#email').change(function(){
        var email = $(this).val();

        if(email.indexOf("@") != -1){
            if(email.length > 10){
                emailValido = true;
                $('#lblEmail').text(''); 
            }else {
                emailValido = false;
                $('#lblEmail').attr('style', 'color:red');;
                $('#lblEmail').text('E-mail inválido!');
            }
        }else {
            emailValido = false;
            $('#lblEmail').attr('style', 'color:red');;
            $('#lblEmail').text('E-mail inválido!');
        }

    });

    // validar cpf
    $('#cpf').change(function(){
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
                $('#lblCpf').attr('style', 'color: red');
                $('#lblCpf').text("CPF inválido!");
                $('#cpf').val('');
                $('#cpf').focus();
                cpfValido = false;
            }else{
                $('#lblCpf').removeAttr('style');
                $('#lblCpf').text("");
                cpfValido = true;
            }
        }
        else{
            $('#lblCpf').attr('style', 'color: red');
            $('#lblCpf').text("CPF inválido!");
            $('#cpf').val('');
            $('#cpf').focus();
            cpfValido = false;
        }
    });


    // validar campo de registro
    $('#cadjus').change(function(){
        var registro = $(this).val();
        if(registro > 0 && registro <= 5000){
            $('#lblRegistro').text("");
            registroValido = true;
        }else{
            $('#lblRegistro').text("Registro Inválido!");
            registroValido = false;
        }
    });


    // permitir apenas os campos específicos com números
    $(".campoNumero").bind("keyup blur focus", function(e) {
        e.preventDefault();
        var expre = /[^\d]/g;
        $(this).val($(this).val().replace(expre,''));
    });


    // validar a senha
    $('#confirmaSenha').change(function(event) {
        var senha1 = $('#senha').val();
        var senha2 = $(this).val();

        if(senha1 == senha2){
            $('#lblSenha').text("");
            senhaValida = true;
        }else {
            $('#lblSenha').text("As senhas não coincidem!!");
            senhaValida = false;
        }
    });

    $('#btnCadastrar').click(function(event) {
        if(validarCampos())
            cadastrarCandidato();
        else{
            alert("Verificar um ou mais campos!");
        }
    });

    function validarCampos(){    
        if(nomeValido && idadeValida && cpfValido && registroValido && senhaValida && emailValido){
            return true;      
        }else{
            return false;
        }
    }   

});



function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
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


function cadastrarCandidato(){
    var _nome = $('#nome').val();
    var _datanasc = $('#dtNasc').val();
    var _sexo = $('#sexo').val();
    var _cpf = $('#cpf').val();
    var _rua = $('#rua').val();
    var _numero = $('#numero').val();
    var _bairro = $('#bairro').val();
    var _cidade = $('#cidades option:selected').val();
    var _estado = $('#estados option:selected').val();
    var _email = $('#email').val();
    var _registro = $('#cadjus').val();
    var _senha = $('#senha').val();

     $.ajax({
        url : "http://andrebordignon.esy.es/php/incluicandidato.php",
        type : 'post',
        data : {
            nome   : _nome,
            email  : _email,
            senha  : _senha,
            sexo   : _sexo,
            cadjus : _registro,
            rua    : _rua,
            numero : _numero,
            bairro : _bairro,
            cidade : _cidade,
            estado : _estado,
            cpf    : _cpf,
            dataNasc : _datanasc
        },
        beforeSend : function(){
           console.log("ENVIANDO...");
        }
        })
        .done(function(msg){
          console.log("DONE: " + msg);
          $('#nome').val('');
          $('#dtNasc').val('');
          $('#sexo').val('');
          $('#cpf').val('');
          $('#rua').val('');
          $('#numero').val('');
          $('#cidades option:selected').val('');
          $('#estados option:selected').val('');
          $('#email').val('');
          $('#cadjus').val('');
          $('#senha').val('');
          alert("Candidato cadastrado com sucesso!");
        })
        .fail(function(jqXHR, textStatus, msg){
            alert("FAIL" + msg);
        }); 
}





