function iniciarJogo(){
    var nivel_jogo = document.getElementById('nivel_jogo').value; //a variavel vai pegar o resultado do id nivel_jogo no select
    window.location.href= 'jogo.html?'+ nivel_jogo; //força a troca de página para iniciar o jogo
}