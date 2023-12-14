class Jugador extends Personaje { // Clase Jugador hereda de Personaje
   puedeDisparar;

   constructor (posicion) {
      super(posicion)
      this.sprite = loadImage('assets/jugador.png');
      this.direccion = createVector();
      this.puedeDisparar = true;
   }

   dibujar () {
      push();
         translate(this.posicion.x, this.posicion.y);
         rotate(this.angulo);
         image(this.sprite, 0, 0);
      pop();
   }

   mover () {
      push();
         let objetivo = createVector(mouseX, mouseY); // Apunta a la posición del cursor (aunque este no sea visible)
         this.direccion = objetivo.copy().sub(this.posicion);
         this.spawnBala = this.posicion.copy().add(this.direccion.copy().normalize().mult(50)); // calcula la posicion del punto de salida de la bala
         this.cuerpo = this.posicion.copy().add(this.direccion.copy().normalize().mult(-50)); // mover el collider del cuerpo
         this.angulo = -this.direccion.angleBetween(createVector(-1, 0)); // calcuar el ángulo para rotar al personaje
      pop();
   }

   get puedeDisparar () {
      return this.puedeDisparar;
   }

   set puedeDisparar (value) {
      this.puedeDisparar = value;
   }
}
