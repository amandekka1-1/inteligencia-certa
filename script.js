import { perguntas } from "./perguntas.js";
import { embaralhar } from "./aleatorio.js";

// Selecionando elementos
const btnIniciar = document.querySelector(".btn-iniciar");
const btnReiniciar = document.querySelector(".btn-reiniciar");
const telaInicial = document.querySelector(".tela-inicial");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");

// Controle do jogo
let perguntasEmbaralhadas = [];
let indicePergunta = 0;
let historiaFinal = [];

// Iniciar jogo
btnIniciar.addEventListener("click", () => {
  telaInicial.style.display = "none";
  caixaResultado.style.display = "none";

  perguntasEmbaralhadas = embaralhar(perguntas); // Embaralha perguntas
  indicePergunta = 0;
  historiaFinal = [];

  mostrarPergunta();
});

// Mostrar pergunta
function mostrarPergunta() {
  caixaPerguntas.innerHTML = "";
  caixaAlternativas.innerHTML = "";

  if (indicePergunta >= perguntasEmbaralhadas.length) {
    mostrarResultado();
    return;
  }

  const perguntaAtual = perguntasEmbaralhadas[indicePergunta];

  // Enunciado
  const enunciado = document.createElement("h2");
  enunciado.textContent = perguntaAtual.enunciado;
  caixaPerguntas.appendChild(enunciado);

  // Alternativas
  perguntaAtual.alternativas.forEach(alternativa => {
    const botao = document.createElement("button");
    botao.textContent = alternativa.texto;
    botao.classList.add("alternativa-btn");

    botao.addEventListener("click", () => {
      historiaFinal.push(alternativa.afirmacao);
      indicePergunta++;
      mostrarPergunta();
    });

    caixaAlternativas.appendChild(botao);
  });
}

// Mostrar resultado (história final)
function mostrarResultado() {
  caixaPerguntas.innerHTML = "";
  caixaAlternativas.innerHTML = "";
  caixaResultado.style.display = "block";

  textoResultado.textContent = historiaFinal.join(" ");
}

// Reiniciar jogo
btnReiniciar.addEventListener("click", () => {
  telaInicial.style.display = "block";
  caixaResultado.style.display = "none";
});