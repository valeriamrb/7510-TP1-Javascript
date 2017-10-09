function Expresion(nombre, argumentos) {
    this.nombre = nombre;
    this.argumentos = argumentos;

    this.comparar = function(consulta) {
      if(this.nombre == consulta.getNombre() && this.argumentos == consulta.getArgumentos()) {
          return true;
      }
      return false;
    }

    this.evaluar = function(diccionarioArgumentos){
      //Asocia argumentos concretos a los argumentos genericos de la expresion.
      for (var i = 0; i < this.argumentos.length; i+=1) {
          var valor = diccionarioArgumentos[this.argumentos[i]];
          this.argumentos[i] = valor;
      }
    }
}

module.exports = Expresion;
