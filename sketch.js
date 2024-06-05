function setup() { //essa função é executada uma vez
  createCanvas(600, 600); //cria uma tela de fundo
   background("black");//define a cor dessa tela
}

function draw() { // é executada continuamente em loop.
  stroke(100, 210, 60); //linhas, contorno
  fill(100, 150, 50, 255); //preenchimento

  
  if (mouseIsPressed) { //se o mouse pressionado
    ellipse(mouseX, mouseY, 20, 35); //retangulo
  }
}
