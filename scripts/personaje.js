// Las clases Enemigo y Jugador heredan atributos y métodos de la clase Personaje
class Personaje {
   estaVivo;
   posicion;
   sprite;
   angulo;
   spawnBala;
   cuerpo;
   direccion;
   constructor (posicion) {
      // Inicializar valores
      this.estaVivo =  true;
      this.posicion = posicion;
      this.angulo = 0;
   }

   actualizar () {
      // El método actualizar envía los mensajes mover y dibujar, las subclases Enemigo y Jugador tienen sus propias implementaciones de estos métodos
      this.mover();
      this.dibujar();
   }

   mover () {
    
   }

   dibujar () {
    
   }

   get direccion () {
      return this.direccion;
   }

   get  spawnBala () {
      return this.spawnBala;
   }

   get cuerpo () {
      return this.cuerpo;
   }
}

