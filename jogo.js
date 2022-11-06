var timerId= null; //variavel que armazena a chamada da função timeout

function voltar(){
    window.location='index.html'
}


function iniciarJogo(){

    var url = window.location.search; 
    var nivel_jogo = url.replace("?", ""); //encontra o caractere "?" e subtistui por 'vazio'
    var tempo_segundos = 0;

    if(nivel_jogo == 1){ //fácil
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2){ //normal
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3){ //difícil
        tempo_segundos = 30;
    }

    //inserindo segundos no span
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //quantidade de balões
    var qtde_baloes= 80;
    cria_baloes(qtde_baloes);

    //imprimir qtde baloes inteiros dentro do span
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

    //imprimir qtde baloes estourados dentro do span
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1) //essa função recebe o valor de tempo_segundos
    //+1 para o numero começar arredondado
}

function contagem_tempo(segundos){ //contador regressivo do cronometro

    segundos = segundos - 1; //diminui os segundos

    if(segundos == -1){
        clearTimeout(timerId); //encerra a função setTimeout ao chegar em -1
        game_over(); //caso chegue em -1 chama ativa a função
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000); // a cada 1segundo (1000) a função contagem tempo vai ser chamada
}

function remove_eventos_baloes(){
    var i = 1;

    while(document.getElementById('b' + i)){
        document.getElementById('b' + i).onclick = '';
        i++;
    }
}


function game_over(){
    remove_eventos_baloes();
    alert('Fim de jogo');
}situacao_jogo;


function cria_baloes(qtde_baloes){

    for(var i = 1; i <= qtde_baloes; i++){
        var balao= document.createElement("img"); //cria um elemento de imagem
        balao.src = 'imagens/balao_azul_pequeno.png'; //define que o elemento criado vai ser essa imagem
        balao.style.margin= '12px'; //espaçamento entre os baloes
        balao.id = 'b' + i; //id de cada balão
        balao.onclick = function(){ estourar(this); }; //função para estourar o balao ao clicar, (o this é uma referencia a o elemento em si, ele mesmo)

        document.getElementById('cenario').appendChild(balao); //pega a div cenário, appendchild coloca a tag img dentro do elemento div cenario
    }
}

function estourar(e){
    
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", ""); // quando clicado remove a função do onclick, impossibilitando que possa ser clicado mais de uma vez
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'; //quando clica troca a imagem

    pontuacao(-1); // a cada clique vai ser -1 balão inteiro

}

function pontuacao(acao){

    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML; //pega o span baloes inteiros
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML; //pega o span baloes estourados
    baloes_inteiros = parseInt(baloes_inteiros); //transforma em variavel numerica
    baloes_estourados = parseInt(baloes_estourados);
    
    baloes_inteiros = baloes_inteiros + acao; //subtrai o -1 da pontuação nos baloes inteiros grande (menos com mais subtrai)
    baloes_estourados = baloes_estourados - acao; //soma o -1 da pontuacao nos baloes estourados grande (menos com menos soma)

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros; //joga o valor do baloes inteiros no span
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados; //joga o valor do baloes estourados no span

    situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(baloes_inteiros){ //verifica se todos os baloes foram estourados
    if(baloes_inteiros == 0){
        alert('Parabens, você conseguiu estourar todos os balões a tempo!')
        parar_jogo(); //se todos os baloes forem estourados chama a função
    }
}

function parar_jogo(){
    clearTimeout(timerId); //para a variavel 
}