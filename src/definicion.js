function Definicion(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.comparar = function(consulta) {
      ///Debug
  /*    console.log("##Estoy en definicion.comparar")
      console.log("Nombre Consulta:");
      console.log(consulta.getNombre());
      console.log("Argumentos Consulta:");
      console.log(consulta.getStringArgumentos());
      console.log("Nombre Definicion:");
      console.log(this.nombre);
      console.log("Argumentos Definicion:");
      console.log(this.argumentos);*/
      ///Fin debug
      if(this.nombre == consulta.getNombre() && this.argumentos == consulta.getStringArgumentos()) {
          return true;
      }
      return false;
    }

    this.getNombre = function() {
      return this.nombre;
    }

    this.getStringArgumentos = function() {
      //Devuelve los argumentos en un string separados por coma.
      return this.argumentos.join(", ");
    }
}

module.exports = Definicion;
