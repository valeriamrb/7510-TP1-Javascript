var Parser = require('../src/parser');

var Interpreter = function () {
    this.unParser = new Parser();
    this.baseValida = false;
    this.diccionarioDefiniciones = {};
    this.diccionarioReglas = {};

    this.parseDB = function (params, paramss, paramsss) {
      //Valido si la base de datos es valida.
      if(this.unParser.validarBase(params) == false){
        return null;
      }
      this.baseValida = true;

      //Parseo la base de datos recibida como parametro.
      //Creo un diccionario de definiciones y otro de reglas.
	   for (var i = 0; i < params.length; i+=1) {
        if(this.unParser.esDefinicion(params[i])) {
                var definicion = this.unParser.parsearDefinicion(params[i]);
                var clave = this.diccionarioDefiniciones[definicion.getNombre()];
                if( clave == undefined ) {
                  //Si no existe la definicion en el diccionario, la agrego dentro
                  //de una lista asociada a el nombre de clave.
                  this.diccionarioDefiniciones[definicion.getNombre()] = [definicion];
                } else {
                  //Si existe la definicion en el diccionario, la agrego a la lista
                  //correspondiente.
                  this.diccionarioDefiniciones[definicion.getNombre()].push(definicion);
                }
        } else if(this.unParser.esRegla(params[i])) {
                var unaRegla = this.unParser.parsearRegla(params[i]);
                this.diccionarioReglas[unaRegla.getNombre()] = unaRegla;
        } else {
          //Base mal formada
          return false;
        }
	   }
    }

    this.checkQuery = function (params) {
        //Si la base de datos no era valida devuelvo null
        if(this.baseValida == false) {
          return null;
        }

        //Verifico si la consulta es valida. Si no lo es retorno null
        if(!this.unParser.esConsultaValida(params)){
          throw new Error("Consulta mal formada");
        }
        //Parseo la consulta.
        var consulta = this.unParser.parsearConsulta(params);
        var claveConsulta = consulta.getNombre();

        //Busco si la consulta existe en el diccionario de definiciones.
        var definiciones = this.diccionarioDefiniciones[claveConsulta];
        if( definiciones != undefined){
          //Recorro la lista de definiciones asociadas a esa clave para
          //comparar si la consulta es verdadera.
          for (var i = 0; i < definiciones.length; i+=1) {
            if(definiciones[i].comparar(consulta)) {
              //Si encontre la definicion, la co  console.log("Verifico si la consulta es valida");nsulta es verdadera.
              return true;
            }
          }
          //Si no encontre la definicion, la consulta es falsa.
          return false;
        } else {
          //Si no existe la definicion, busco en el diccionario de reglas.
          var regla = this.diccionarioReglas[claveConsulta];
          if( regla != undefined){
            //Si existe la regla, la evaluo para ver si la consulta es verdadera
            if(regla.comparar(consulta, this.diccionarioDefiniciones)) {
              //Si la regla evaluada da true, la consulta es verdadera
              return true;
            }
            //Si la regla evaluada da false, la consulta es falsa
            return false;
          }
          //Si no existe la regla, la consulta es falsa.
          return false;
        }
    }

}

module.exports = Interpreter;
