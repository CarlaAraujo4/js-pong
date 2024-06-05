// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;

let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

// variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

// placar
let meusPontos = 0;
let pontosOponente = 0;

// sons do jogo
let ponto;
let trilha;
let raquetada;

// obstáculos
let obstaculoX = 300;
let obstaculoY = 50;
let obstaculoLargura = 10;
let obstaculoAltura = 50;
let obstaculoVelocidadeY = 3; // Velocidade de movimento vertical

let obstaculo2X = 200;
let obstaculo2Y = 200;
let obstaculo2Largura = 10;
let obstaculo2Altura = 50;
let obstaculo2VelocidadeY = 2; // Velocidade de movimento vertical

let obstaculo3X = 400;
let obstaculo3Y = 300;
let obstaculo3Largura = 10;
let obstaculo3Altura = 50;
let obstaculo3VelocidadeY = 4; // Velocidade de movimento vertical

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(40);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  movimentaObstaculos(); // Nova função para movimentar obstáculos
  mostraObstaculos();
  verificaColisaoObstaculos();
}

function mostraBolinha() {
  fill("rgb(0,240,255)");
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  fill("yellow");
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(87)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)) {
    yRaqueteOponente += 10;
  }
}

function incluirPlacar(){
  textAlign(CENTER);
  textSize(20);
  textFont('Courier New');
  // meus pontos
  fill(color("rgb(13,238,32)"));
  text(meusPontos, 150, 26);
  // pontos do oponente
  text(pontosOponente, 450, 26);
  fill("white");
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function movimentaObstaculos() {
  // Movimenta o primeiro obstáculo
  obstaculoY += obstaculoVelocidadeY;
  if (obstaculoY <= 0 || obstaculoY + obstaculoAltura >= height) {
    obstaculoVelocidadeY *= -1;
  }
  
  // Movimenta o segundo obstáculo
  obstaculo2Y += obstaculo2VelocidadeY;
  if (obstaculo2Y <= 0 || obstaculo2Y + obstaculo2Altura >= height) {
    obstaculo2VelocidadeY *= -1;
  }
  
  // Movimenta o terceiro obstáculo
  obstaculo3Y += obstaculo3VelocidadeY;
  if (obstaculo3Y <= 0 || obstaculo3Y + obstaculo3Altura >= height) {
    obstaculo3VelocidadeY *= -1;
  }
}

function mostraObstaculos() {
  fill("red");
  rect(obstaculoX, obstaculoY, obstaculoLargura, obstaculoAltura);
  rect(obstaculo2X, obstaculo2Y, obstaculo2Largura, obstaculo2Altura);
  rect(obstaculo3X, obstaculo3Y, obstaculo3Largura, obstaculo3Altura);
}

function verificaColisaoObstaculos() {
  verificaColisaoObstaculo(obstaculoX, obstaculoY, obstaculoLargura, obstaculoAltura);
  verificaColisaoObstaculo(obstaculo2X, obstaculo2Y, obstaculo2Largura, obstaculo2Altura);
  verificaColisaoObstaculo(obstaculo3X, obstaculo3Y, obstaculo3Largura, obstaculo3Altura);
}

function verificaColisaoObstaculo(x, y, largura, altura) {
  if (xBolinha + raio > x && xBolinha - raio < x + largura && yBolinha + raio > y && yBolinha - raio < y + altura) {
    velocidadeXBolinha *= -1;
  }
}