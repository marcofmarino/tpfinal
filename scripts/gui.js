class Boton {
   etiqueta;
   posicion;
   tamanio;
   constructor (etiqueta, posicion, tamanio) {
      this.etiqueta = etiqueta;
      this.posicion = posicion;
      this.tamanio = tamanio;
   }

   draw () {
     
   }

   colision () {

   }

   get etiqueta () {
      return this.etiqueta;
   }
}

class BotonRectangular extends Boton {
   constructor (etiqueta, posicion, tamanio) {
      super(etiqueta, posicion, tamanio)
   }

   draw () {
      push();
      if (this.colision()) {
         fill('#8f1919');
      } else {
         fill('#f2f2f2');
      }
      rectMode(CENTER);
      rect(this.posicion[0], this.posicion[1], this.tamanio[0], this.tamanio[1]);
      fill('#222222');
      textAlign(CENTER, CENTER);
      text(this.etiqueta, this.posicion[0], this.posicion[1]);
      pop();
   }

   colision(){
      return mouseX >= this.posicion[0] - this.tamanio[0]/2 && mouseX <= this.posicion[0] + this.tamanio[0]/2 && mouseY >= this.posicion[1] - this.tamanio[1]/2 && mouseY <= this.posicion[1] + this.tamanio[1]/2;
   }
}

class BotonCircular extends Boton {
   constructor (etiqueta, posicion, tamanio) {
      super(etiqueta, posicion, tamanio)
      
   }

   draw () {
      push();
      if (this.colision()) {
         fill('#8f1919');
      } else {
         fill('#f2f2f2');
      }
      ellipseMode(CENTER);
      ellipse(this.posicion[0], this.posicion[1], this.tamanio, this.tamanio);
      fill('#222222');
      textAlign(CENTER, CENTER);
      text(this.etiqueta, this.posicion[0], this.posicion[1]);
      pop();
   }

   colision() {
      return dist(this.posicion[0], this.posicion[1], mouseX, mouseY) <= this.tamanio/2;
   }
}
