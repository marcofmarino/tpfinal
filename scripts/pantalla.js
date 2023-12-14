class Pantalla {
   imagen;
   textos;
   botones;
   colorTexto;
   modoTexto;
   tamanio;
   constructor (dirImagen, datos, colorTexto, modoTexto, tamanio) {
      // Cargar imagen de la pantalla
      this.imagen = loadImage(dirImagen);
      // Inicializar como array vacío
      this.botones = []; 
      this.textos = datos['textos'];
      this.modoTexto = modoTexto;
      this.colorTexto = colorTexto;
      this.tamanio = tamanio;
      // Agregar botones al array con instancias de botones
      datos["botones"].forEach(element => {
         if(element.tipo === "rectangular") {
            this.botones.push(new BotonRectangular(element.etiqueta, element.posicion, element.tamanio));   
         } else {
            this.botones.push(new BotonCircular(element.etiqueta, element.posicion, element.tamanio));   
         }
      });     
   }

   actualizar () {
      //Mostrar imagen, textos y botones de la pantalla
      push();
      image(this.imagen, 0, 0);
      textAlign(this.modoTexto[0], this.modoTexto[1]);
      textSize(this.tamanio);
      fill(this.colorTexto);
      this.textos.forEach(element => {
         text(element.contenido, element.posicion[0], element.posicion[1]);
      });
      pop();
      this.botones.forEach(element => {
         element.draw();
      });
   }

   mousePressed () {
      // Recorrer array de botones para comprobar si alguno fue pulsado
      this.botones.forEach(element => {
         if (element.colision()) {
            aventuraGrafica.cambiarEstado(element.etiqueta);
            return;
         }
      });
   }
   
}
