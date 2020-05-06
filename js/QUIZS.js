

// shuffle - mistura posições do array    

function shuffle(array) { 
   let counter = array.length
   while (counter > 0) {
        let index = Math.floor(Math.random() * counter);

        counter--;

        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;

   }  
   return array;
}









//retorna o objeto pergunta da api
function pegar_pergunta(callback) {

    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=12", //endereço da API
        type: "GET",  // tipo da requisição
        dataType: "json", //tipo de dado
    }).done(function(data){  //deu tudo certo
        callback(data.results[0]);
    }).fail(function(){ //caso de erro
        console.log('Erro na requisição');
    });

}

var placar = 0;

function gerar_pergunta(pergunta) { // função para tratar o objeto pergunta da API
    $("#pergunta").html(pergunta.question)  // insere a pergunta no html
    var resposta_correta = pergunta.correct_answer; // insere o valor resposta correta do objeto na variavel
    var respostas = pergunta.incorrect_answers; // insere as respostas incorretas do objeto na variavel
    respostas.push(resposta_correta); // insere a resposta correta no meio de todas as respotas armazenadas
    respostas = shuffle(respostas); // mistura a resposta correta entre as respotas incorretas

    for (a = 0; a < respostas.length; a++){  //gera as alternativas de acordo com a quantidade de alternativas armazenadas na variavel respotas
        $("#opcoes").append('<input type="radio" name="opcao" value="' + respostas[a] + '"> ' + respostas[a] + '<br>'); //
    }

    $("#opcoes input[name='opcao']").change(function(){  // mostra o botão enviar respostas caso alguma alternativa seja selecionada
        $("#submeter").show(); // mostra o botão, enviar resposta
    });
    
    $("#submeter").click(function(){ // click do botão submeter
        
        var resposta_escolhida = $("#opcoes input[name='opcao']:checked").val(); //armazena o resultado selecionado em uma variável

        $("#submeter").hide(); // esconde o botão submeter caso ele seja clicado
        

        if(resposta_escolhida == resposta_correta) { // compara a resposta escolhida 
            $("#erro_acerto").html("<span style='color: green'; font-weight: bold'>ACERTOU!!! A resposta é: " + resposta_correta + "</span>"); // mensagem resposta certa
            placar = placar + 1 // alimenta o placar
            $("#placar").html("Placar atual:" + placar) // mensagem do placar
        }else {
            $("#erro_acerto").html("<span style='color: red'; font-weight: bold'>ERROU MANO =S           A resposta é: " + resposta_correta + "</span>");
            $("#placar").html("Placar atual:" + placar)
        }

        $("#opcoes input[name='opcao']").attr('disabled', true); // desabilita as opções ao clicar no botão submeter

        $("#nova_pergunta").show();  // mostra o botão nova pergunta
    });


}

    $("#nova_pergunta").click(function(){ // trata o click do botão nova pergunta, para gerar nova pergunta
        $("#opcoes").html(""); // limpa as alternativas
        $("#erro_acerto").html(""); // limpa a mensagem de acerto ou erro
        $("#pergunta").html(""); // limpa a pergunta 
        $("#nova_pergunta").hide(); // esconde o botão nova pergunta
        pegar_pergunta(gerar_pergunta); // chama a função gerar pergunta novamente
        

    });

        

pegar_pergunta(gerar_pergunta);