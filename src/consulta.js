function Consulta(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.getNombre = function() {
      return this.nombre;
    }

    this.getArgumentos = function() {
      return this.argumentos;
    }
}

module.exports = Consulta;
