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
        var definicionesFormadas = this.formarRegla(consulta);
        console.log("La lista de definicionesFormadas es:");
        console.log(definicionesFormadas);
        //Busco si las definiciones que componen la regla existen y son verdaderas
        for (var i = 0; i < definicionesFormadas.length; i+=1) {
            var definiciones = diccionario[definicionesFormadas[i].getNombre()]
            if( definiciones == undefined ) {
              //Si no existe la definicion en el diccionario, la regla no es verdadera
              return false;
            } else {
              console.log("Existe el nombre de la definicion.");
              //Si existe el nombre de la definicion, busco si se corresponden
              //los parametros.
              var existeDefinicion = false;
              for (var j = 0; j < definiciones.length; j+=1) {
                console.log("Quiero comparar:");
                console.log(definiciones[j]);
                console.log("con:");
                console.log(definicionesFormadas[i]);
                if(definiciones[j].comparar(definicionesFormadas[i])) {
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
        //Si todas las definiciones eran verdaderas, la regla se cumple.
        return true;
    }

    this.formarRegla = function(consulta) {
      //Asocio los argumentos genericos a los argumentos concretos de la consulta.
      var mapaArgumentos = {};
      var definiciones = []
      var argumentosConsulta = consulta.getArgumentos();

      for (var i = 0; i < this.argumentosGenericos.length; i+=1) {
          mapaArgumentos[this.argumentosGenericos[i]] = argumentosConsulta[i];
      }

      //Evaluo las definiciones.
      for (var i = 0; i < this.listaDefiniciones.length; i+=1) {
          definiciones[i] = this.listaDefiniciones[i].evaluar(mapaArgumentos);
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
