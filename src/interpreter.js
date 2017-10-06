var Parser = require('../src/parser');

var Interpreter = function () {

    this.parseDB = function (params, paramss, paramsss) {
    "Recibe una lista de definiciones y reglas en formato string."

	//Paso la consulta a un formato interpretable.

  	//Si la consulta esta bien formada la proceso.

	//Recorro la lista para verificar si la base de datos es correcta.
     var unParser = new Parser();
     //console.log(unParser.saludo);

	   for (var i = 0; i < params.length; i+=1) {
	  //console.log("En el índice '" + i + "' hay este valor: " + params[i]);
        if(unParser.esDefinicion(params[i]) == true) {
                console.log("La linea '" + i + "es definicion");
                console.log(unParser.parsearDefinicion(params[i]));
        }
        else if(unParser.esRegla(params[i]) == true) {
                console.log("La linea '" + i + "es regla");
                console.log(unParser.parsearRegla(params[i]));
        } else {
            console.log("No soy nada");
        }
	   }
    }

    this.checkQuery = function (params) {
        return true;
    }

}

module.exports = Interpreter;
