function Consulta(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

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

module.exports = Consulta;
