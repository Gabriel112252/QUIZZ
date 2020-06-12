$("#submeter").click(function(){
    var enunciado = $("#questao").val(),
    resposta_correta = $("#correta").val(),
    resposta_incorreta = $("#incorreta").val(),
    resposta_incorretb = $("#incorretb").val(),
    resposta_incorretc = $("#incorretc").val();
    if(enunciado== ''){
      alert('A pergunta ta em branco mano =(');
    }else{
    question = {}
    var param = {
        question: {
                quest:enunciado,
                correct:resposta_correta,
                incorrecta:resposta_incorreta,
                incorrectb:resposta_incorretb,
                incorrectc:resposta_incorretc
             }
        }
    }
$.post("https://serene-garden-00468.herokuapp.com/questions/",
        param,
function(data, status){
  alert("Data: " + data + "\nStatus: " + status);
})
});
