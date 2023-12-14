class Bala {
   direccion;
   posicion;
   rapidez;
   
   constructor (posicion, direccion) {
      this.posicion = posicion;
      this.direccion = direccion;
      this.rapidez = 35;
   }

   actualizar () {
      this.mover();
      this.dibujar();
   }

   mover () {
      // Normalizar la dirección para que la bala sea desplazada de acuerdo a su velocidad
      this.posicion.add(this.direccion.normalize().copy().mult(this.rapidez));
   }

   dibujar () {
      push();
         fill("black");
         ellipse(this.posicion.x, this.posicion.y, 6, 6);
      pop();
   }
}
