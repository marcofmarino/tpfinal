class Enemigo extends Personaje { // Clase Enemigo hereda de Personaje
   tiempoReaccion;
   tiempoInicio;
   yaGiro;

   constructor (posicion) {
      super(posicion)
      this.sprite = loadImage('assets/enemigo.png');   
      this.yaGiro = false;
      this.direccion = createVector();
   }

   dibujar() {
      push();
         translate(this.posicion.x, this.posicion.y);
         rotate(this.angulo);
         image(this.sprite, 0, 0);
      pop();
  }

   mover() {
      this.cuerpo = this.posicion.copy().add(this.direccion.copy().normalize().mult(-50)); // modificar la posición del collider con el cuerpo
      if (!this.yaGiro && (millis() - this.tiempoInicio)/1000 > this.tiempoReaccion){
         this.angulo += int(random(172, 188)); // Angulo de giro al azar
         this.yaGiro = true;
         this.direccion =  this.posicion.copy().setHeading(this.angulo);
         this.spawnBala = this.posicion.copy().add(this.direccion.copy().normalize().mult(50)); // modificar la posición que sirve como punto de aparición de la bala
         aventuraGrafica.getPantallaActual().agregarBala(this.spawnBala, this.direccion);
      }
   }

   get yaGiro () {
      return this.yaGiro;
   }

   calcularReaccion () { // Calcular el tiempo que tarda el enemigo en girar
      this.tiempoReaccion = random(0.1, 0.5);
      this.tiempoInicio = millis();
   }
}
