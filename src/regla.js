function Regla(nombre, argumentos, listaDefiniciones) {
    this.nombre = nombre;
    this.argumentosGenericos = argumentos;
    this.listaDefiniciones = listaDefiniciones;


    this.comparar = function(consulta, diccionario) {
        if(this.nombre != consulta.getNombre()) {
          return false;
        }
        //Si el nombre es igual evaluo la regla, reemplazando las definiciones
        //de la misma por los argumentos de la consulta.
        var definicionesFormadas = formarRegla(consulta);
        for (var i = 0; i < definicionesFormadas.length; i+=1) {
            definicionesFormadas[i] = argumentosConsulta[i];
        }
    }

    this.formarRegla = function(consulta) {
      //Asocio los argumentos genericos a los argumentos concretos de la consulta.
      var mapaArgumentos = {};
      var definiciones = []
      var argumentosConsulta = consulta.getArgumentos();

      for (var i = 0; i < argumentosGenericos.length; i+=1) {
          mapaArgumentos.argumentosGenericos[i] = argumentosConsulta[i];
      }

      //Evaluo las definiciones.
      for (var i = 0; i < listaDefiniciones.length; i+=1) {
          definiciones[i] = listaDefiniciones[i].evaluar(mapaArgumentos);
      }
      console.log("La lista de definiciones evaluadas formadas es:");
      console.log(definiciones);
      return definiciones;
    }
}

module.exports = Regla;
