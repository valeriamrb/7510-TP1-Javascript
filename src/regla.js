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

        //Busco si las definiciones que componen la regla existen y son verdaderas
        for (var i = 0; i < definicionesFormadas.length; i+=1) {
            var definicion = diccionario[definicionesFormadas[i].getNombre()]
            if( definicion == undefined ) {
              //Si no existe la definicion en el diccionario, la regla no es verdadera
              return false;
            } else {
              //Si existe el nombre de la definicion, busco si se corresponden
              //los parametros.
              listaDef = diccionario[definicionesFormadas[i].getNombre()]
              var existeDefinicion = false;
              for (var i = 0; i < listaDef.length; i+=1) {
                if(listaDef[i].comparar(consulta)) {
                  existeDefinicion = true;
                  break;
                }
              }
              //Si una de las definiciones no era verdadera, la regla no se cumple.
              if(existeDefinicion == false) {
                return false;
              }
            }
        }
        //Si todas las definiciones eran verdaderas, la regla no se cumple.
        return true;
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

    this.getNombre = function() {
      return this.nombre;
    }
}

module.exports = Regla;
