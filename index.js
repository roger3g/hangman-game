var bibliotecaDePalavras = [ // Este array vai guardar as possíveis palavras da nossa forca
	"javascript", "curso", "computador", 
	"transporte", "livraria", "tecnologia", 
	"controle", "churrasco", "brasil", 
	"impressora", "xicara", "telefone", 
	"internet", "camera", "monitor", 
	"brinquedo", "youtube", "portaria", 
	"escola", "carnaval", "teclado", 
	"guitarra", "bateria", "chinelo", 
	"helicoptero", "arduino"
];

var quantidadeDePalavras = bibliotecaDePalavras.length - 1; // a variavel 'quantidadeDePalavras' vai guardar a quantidade de palavras que tem dentro do array 'bibliotecaDePalavras'
var positonNoArray = Math.round(Math.random() * quantidadeDePalavras); // a variavel 'positonNoArray' vai guardar um número randomico entre 0 e o valor da variável 'quantidadeDePalavras' e o resultado vai ser relacionado ao indíci do array biblioteca
var palavraSorteada = bibliotecaDePalavras[positonNoArray]; // a variável 'palavraSorteada' vai receber a palavra sorteada pela variável 'positonNoArray'
var tamanhoDaPalavraSorteada = palavraSorteada.length; // a variável 'tamanhoDaPalavraSorteada' vai guardar o tamanho da palavra sorteada
// var caixaLetras = []; // cxLetras
var numeroDeAcertos; // a variavel 'numeroDeAcertos'  vai guardar o número de acertos
// var numeroMaximoDeErros = 7; // a variável 'numeroMaximoDeErros' vai guardar o número máximo de erros
var numeroTotalDeErros = 0; // a variável 'numeroTotalDeErros' vai guardar o número total de erros do usuário
var desenhosDoCorpo = []; // este array vai guardar os elemento que contem as imagens do desenho desenhosDoCorpo
var acertou = false; // a variável 'acertou' vai servir para saber se o usuário caertou
var jogoRodando = false; // a variável 'jogoRodando' vai servir para saber se o jogo está rodando
var jogador;

window.addEventListener("load", start);

function start(){
	jogoRodando = true;
	jogador = document.getElementById("letraDoJogador");
	jogador.value = "";
	jogador.focus();

	numeroDeAcertos = 0;
	numeroTotalDeErros = 0;
	acertou = false;

	document.getElementById("divLetrasDigitadas").innerHTML = "Letras Digitadas:";

	positonNoArray = Math.round(Math.random() * quantidadeDePalavras);
	palavraSorteada = bibliotecaDePalavras[positonNoArray];
	tamanhoDaPalavraSorteada = palavraSorteada.length;

	defineLetras(tamanhoDaPalavraSorteada);

	document.getElementById("divMensagem").innerHTML = "";
	desenhosDoCorpo[1] = document.getElementById("cabeca");
	desenhosDoCorpo[2] = document.getElementById("corpo");
	desenhosDoCorpo[3] = document.getElementById("bracoE");
	desenhosDoCorpo[4] = document.getElementById("bracoD");
	desenhosDoCorpo[5] = document.getElementById("pernaE");
	desenhosDoCorpo[6] = document.getElementById("pernaD");
	document.getElementById("cabeca").src = "assets/cabeca1.png";

	for(let i = 1; i < 7; i++){
		desenhosDoCorpo[i].style.display = "none";
	}
}

function defineLetras(l){
	var objeto;
	for(let i = 0; i < 20; i++){
		objeto = document.getElementById("letra" + i).value = "";
		objeto = document.getElementById("letra" + i).style.display = "none";
	}

	for(let i = 0; i < l; i++){
		objeto = document.getElementById("letra" + i).style.display = "inline-block";
	}
}

function jogar(){
	jogador.focus();
	if(jogador.value == ""){
		alert("Digite uma letra");
	}else{
		if(jogoRodando){
			var objeto;
			var letraTmp;
			var letra;
			var pesq;
			letra = jogador.value;
			jogador.value = "";
			acertou = false;
			pesq = palavraSorteada.match(letra);

			while(pesq != null){
				letraTmp = palavraSorteada.search(letra);
				objeto = document.getElementById("letra" + letraTmp).value = letra;
				palavraSorteada = palavraSorteada.replace(letra, '0');
				numeroDeAcertos++;
				pesq = palavraSorteada.match(letra);
				acertou = true;
			}

			if(!acertou){
				document.getElementById("divLetrasDigitadas").innerHTML += letra.toUpperCase() + " ";
				numeroTotalDeErros++;
				if(numeroTotalDeErros < 7){
					desenhosDoCorpo[numeroTotalDeErros].style.display = "block";
				}else{
					document.getElementById("cabeca").src = "assets/cabeca2.png";
					document.getElementById("divMensagem").innerHTML = "PERDEU";
					jogoRodando = false;
				}
			}

			if(numeroDeAcertos == tamanhoDaPalavraSorteada){
				document.getElementById("divMensagem").innerHTML = "GANHOU";
				jogoRodando = false;
			}
		}
	}
}

function dica(){
	window.alert(palavraSorteada);
	jogador.focus();
}