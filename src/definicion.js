function Definicion(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.comparar = function(consulta) {
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

    this.getArgumentos = function() {
      return this.argumentos;
    }
}

module.exports = Definicion;
