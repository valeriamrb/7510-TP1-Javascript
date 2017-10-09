var Parser = require('../src/parser');

var Interpreter = function () {
    this.unParser = new Parser();
    this.diccionarioDefiniciones = {};
    this.diccionarioReglas = {};

    this.parseDB = function (params, paramss, paramsss) {
    //Parseo la base de datos recibida como parametro.
    //Creo un diccionario de definiciones y otro de reglas.

	   for (var i = 0; i < params.length; i+=1) {
        if(this.unParser.esDefinicion(params[i])) {
                console.log("La linea '" + i + "es definicion");
                //console.log(this.unParser.parsearDefinicion(params[i]));
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
                console.log("La linea '" + i + "es regla");
                //console.log(this.unParser.parsearRegla(params[i]));
                var unaRegla = this.unParser.parsearRegla(params[i]);
                //console.log("####La regla es:");
                //console.log(unaRegla.getNombre());
                this.diccionarioReglas[unaRegla.getNombre()] = unaRegla;
        } else {
          //Base mal formada
          return false;
        }
	   }
     console.log("El diccionario de definiciones es:");
     console.log(this.diccionarioDefiniciones);
     console.log("El diccionario de reglas es:");
     console.log(this.diccionarioReglas);
    }

    this.checkQuery = function (params) {
        //Parseo la consulta.
        var consulta = this.unParser.parsearConsulta(params);
        console.log("#######################################");
        console.log("PROCESAMIENTO");
        console.log("La consulta es:");
        console.log(consulta);
        var claveConsulta = consulta.getNombre();

        //Busco si la consulta existe en el diccionario de definiciones.
        var definiciones = this.diccionarioDefiniciones[claveConsulta];
        if( definiciones != undefined){
          console.log("Existe la definicion en el diccionario, su nombre es:");
          console.log(claveConsulta);
          //Recorro la lista de definiciones asociadas a esa clave para
          //comparar si la consulta es verdadera.
          for (var i = 0; i < definiciones.length; i+=1) {
            console.log("Definicion nro:" + i);
            if(definiciones[i].comparar(consulta)) {
              //Si encontre la definicion, la consulta es verdadera.
              console.log("La definicion es true.");
              return true;
            }
          }
          //Si no encontre la definicion, la consulta es falsa.
          console.log("La definicion es false.");
          return false;
        } else {
          //Si no existe la definicion, busco en el diccionario de reglas.
          var regla = this.diccionarioReglas[claveConsulta];
          if( regla != undefined){
            console.log("Existe la regla en el diccionario, su nombre es:");
            console.log(claveConsulta);
            //Si existe la regla, la evaluo para ver si la consulta es verdadera
            if(regla.comparar(consulta, this.diccionarioDefiniciones)) {
              //Si la regla evaluada da true, la consulta es verdadera
              console.log("La regla es true.");
              return true;
            }
            //Si la regla evaluada da false, la consulta es falsa
            console.log("La regla es false porque las definiciones son falsas.");
            return false;
          }
          //Si no existe la regla, la consulta es falsa.
          console.log("La regla es false, no existe.");
          return false;
        }
    }

}

module.exports = Interpreter;
