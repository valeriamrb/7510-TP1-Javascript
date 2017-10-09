function Definicion(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.comparar = function(consulta) {
      ///Debug
      console.log("Nombre Consulta:");
      console.log(consulta.getNombre());
      console.log("Argumentos Consulta:");
      console.log(consulta.getStringArgumentos());
      console.log("Nombre Definicion:");
      console.log(this.nombre);
      console.log("Argumentos Definicion:");
      console.log(this.argumentos);
      ///Fin debug
      if(this.nombre == consulta.getNombre() && this.argumentos == consulta.getStringArgumentos()) {
          return true;
      }
      return false;
    }

    this.getNombre = function() {
      return this.nombre;
    }
}

module.exports = Definicion;
