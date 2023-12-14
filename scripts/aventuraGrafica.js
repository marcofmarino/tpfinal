class AventuraGrafica {
   pantallas;
   indice;
   fuente;

   constructor () {
      this.indice = 0;
      this.fuente = loadFont('./assets/LiberationSerif-Regular.ttf');
      textSize(14);
      textFont(this.fuente);
      angleMode(DEGREES);
      let cantPantallas = 15;
      this.pantallas = [];
      // agregar cada pantalla con la información correspondiente
      for (let index = 0; index < cantPantallas; index++) {
         this.pantallas.push(new Pantalla('assets/' + index.toString().padStart(2, '0') + '_p.jpg', archivo[index], '#222222', [LEFT, TOP], 16));
      } 
      // Fuera del for, se agregan las pantallas de créditos y de juego
      this.pantallas.push(new Pantalla('assets/creditos.jpg', archivo[15], '#f2f2f2', [CENTER, CENTER], 18));
      this.pantallas.push(new Juego());
   }
   
   cambiarEstado(evento) {
      // Se utilizan diccionarios para facilitar saber a qué pantalla lleva cada botón o evento (ganar, perder o empate en el juego), se utiliza el indice de pantalla actual como clave de un diccionario, lo que retorna otro diccionario que tiene como claves las posibles opciones de esa pantalla
      let opciones = {
         0: {
            "Iniciar": 1,
            "Créditos": 15
         },
         1: {
            "Siguiente": 2
         },
         2: {
            "Siguiente": 3
         },
         3: {
            "Ignorar": 4,
            "Desafiar": 7 
         },
         4: {
            "Matarlo": 9,
            "Irse": 5
         },
         5: {
            "Gastarlo": 6,
            "Ignorar": 12
         },
         6: {
            "Inicio": 0
         },
         7: {
            "Irte": 4,
            "Continuar": 16
         },
         8: {
            "Inicio": 0
         },
         9: {
            "Grúshenka": 11,
            "Katerina": 10
         },
         10: {
            "Inicio": 0
         },
         11: {
            "Inicio": 0
         },
         12: {
            "Inicio": 0
         },
         13: {
            "Matarlo": 9,
            "Irse": 5
         },
         14: {
            "Inicio": 0
         },
         15: {
            "Menú": 0
         },
         16: {
            "Victoria": 14,
            "Derrota": 8,
            "Empate": 13
         }
      }
      this.indice = opciones[this.indice][evento];
   }

   mousePressed () {
      this.pantallas[this.indice].mousePressed();
   }

   draw () {
      this.pantallas[this.indice].actualizar();
   }

   getPantallaActual () {
      return this.pantallas[this.indice];
   }
}
