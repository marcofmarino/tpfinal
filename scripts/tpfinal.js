/*
---------------------------------------------
 |  TP Final                                |
 |  Marco Marino                            |
 |  Comisión 3 - Tecnología Multimedial 1   |
 --------------------------------------------
 */
let aventuraGrafica;
let archivo;

function preload() {
   archivo = loadJSON('assets/infoPantallas.json'); // Función asincrónica, se debe cargar en preload para poder leer el archivo
}

function setup() {
   let canvas = createCanvas(600, 600); // Variable para poder mostrar el canvas en otra posición de la página
   canvas.parent("aventura-grafica");
   aventuraGrafica = new AventuraGrafica();
}

function draw() {
   aventuraGrafica.draw();
}

function mousePressed() {
   aventuraGrafica.mousePressed();
}
