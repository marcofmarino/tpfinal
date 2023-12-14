class Juego {
   jugador;
   enemigo;
   balas;
   estado;
   colorFondo;
   imagenMenu;
   tiempoInicio;

   constructor () {
      // Incializar valores de atributos de la clase
      this.imagenMenu = loadImage('assets/menu.png');
      this.estado = 0;
      this.colorFondo = "#afafaf";
      this.jugador = new Jugador(createVector(100, height/2));
      this.enemigo = new Enemigo(createVector(500,height/2));
      this.balas = [];
   }

  actualizar () {
      push();
         textSize(60);
         textAlign(CENTER, CENTER);
         imageMode(CENTER);
         rectMode(CENTER);
         background(this.colorFondo);
         switch (this.estado) {
            case 0: // Estado 0 menú principal
               image(this.imagenMenu, width/2, height/2);
               this.tiempoInicio = millis();
               break;

            case 1: // Estado 1 -> preparación
               if (this.evaluarColisiones()) {
                  this.timer(); // Comprobar tiempo que se pasa con el cursor sobre el rectángulo para inciar
               } else {
                  this.tiempoInicio = millis(); // Si no se tiene el cursor sobre el rectángulo se resetea el tiempo
               }
               rect(0, height/2-10, 50, 50); // Dibujar rectángulo
               // Dibujar jugador y enemigo
               this.jugador.dibujar();
               this.enemigo.dibujar();
               break;

            case 2:
               // Si ocurrió una colisión, el juego terminó
               if(!this.evaluarColisiones()){
                  this.jugador.actualizar(); // Método actualizar -> Mover y Dibujar
                  this.enemigo.actualizar();

                  this.balas.forEach(element => {
                     element.actualizar();
                  });
               // Si ya se disparó y no quedan balas en el array this.balas significa que ocurrió un empate
                  if (!this.jugador.puedeDisparar && this.enemigo.yaGiro && this.balas.length === 0) {
                     this.estado = 3;
                  }
               }
               break;
            case 3:
               // Comprobar resultado del duelo
               if (this.jugador.estaVivo && !this.enemigo.estaVivo) {
                  aventuraGrafica.cambiarEstado("Victoria");
               } else if (this.enemigo.estaVivo && !this.jugador.estaVivo) {
                  aventuraGrafica.cambiarEstado("Derrota");
               } else {
                  aventuraGrafica.cambiarEstado("Empate");
               }            
               // Resetear valores para volver a jugar
               this.estado = 1;
               this.jugador = new Jugador(createVector(100, height/2)); // Nuevas instancias de jugador y enemigo
               this.enemigo = new Enemigo(createVector(500,height/2));
               this.balas = [];
               cursor();
         }
      pop();
   }

   evaluarColisiones () {
      // Evaluar colisiones de acuerdo al estado
      switch (this.estado) {
      case 1:
         // Comprobar mouse sobre el rectángulo
         if (mouseX < 25 && mouseX > 0 && mouseY > height/2 - 35 && mouseY < height/2 + 15) {
            return true;
         }
         break;
      case 2:
         // Comprobar colision de las balas
         this.balas.forEach((element, posElement) => {
            if (this.jugador.estaVivo && element.posicion.dist(this.enemigo.cuerpo) < 40) { // Comprueba la colisión de balas con el enemigo primero, para dar ventaja al jugador
               this.enemigo.estaVivo = false;
               this.balas.splice(posElement, 1);
               this.estado = 3;
               return true;
            } else if (this.enemigo.estaVivo && element.posicion.dist(this.jugador.cuerpo) < 40) { // Comprobar colisión de bala con el juegador
               this.jugador.estaVivo = false;
               this.balas.splice(posElement, 1);
               this.estado = 3;
               return true;
            } else if (element.posicion.dist(createVector(width/2, height/2))>800){ // Comprobar si la bala salió de la pantalla
               this.balas.splice(posElement, 1);
            }
         });
         break;
      }
      return false;
   }
  
   timer () {
      // Calcular los 3 segundos que debe tener el cursor sobre el rectángulo
      let tiempoEspera;
      tiempoEspera = this.tiempoInicio + 3000;
      text(str(round((tiempoEspera - millis())/1000)), width/2, height/2);
      if (round((tiempoEspera - millis())/1000)<= 0) {
         this.enemigo.calcularReaccion(); // Calcula la reacción del enemigo
         this.estado++;
         noCursor(); // Ocultar cursor para dificultar el duelo
      }
   }

   mousePressed () {
      switch (this.estado) {
         case 0: // Al hacer click en el menú principal se cambia de estado
            this.estado++;
            break;

         case 2:
            if (this.jugador.puedeDisparar) { // Si el jugador no disparó, se crea una instancia de bala en el array
               this.balas.push(new Bala(this.jugador.spawnBala.copy(), this.jugador.direccion.copy()));
               this.jugador.puedeDisparar = false; // Ya no puede disparar
            }
            break;
      }
   }

   agregarBala(posicion, direccion){ // Método para agregar balas
      this.balas.push(new Bala(posicion.copy(), direccion.copy()));
   }
}
