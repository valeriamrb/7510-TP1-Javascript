function Definicion(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.comparar = function(consulta) {
      if(this.nombre == consulta.getNombre() && this.argumentos == consulta.getArgumentos()) {
          return true;
      }
      return false;
    }
}

module.exports = Definicion;
