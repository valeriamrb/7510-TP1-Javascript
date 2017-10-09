var Consulta = require('../src/consulta');
var Expresion = require('../src/expresion');
var Definicion = require('../src/definicion');
var Regla = require('../src/regla');

function Parser() {
    this.saludo = "hola";

    this.parsear = function(expresion) {
      if(esDefinicion(expresion)) {
          parsearDefinicion(expresion);
      } else if(esRegla(expresion)){
          parsearRegla(expresion);
      }
      return false
    }

    this.parsearConsulta = function(expresion) {
      var vector1 = expresion.replace(/\)$/, "");
      console.log("El vector1 es:");
      console.log(vector1);
      var vector2 = vector1.split('(');
      var vector3 = vector2[1].split(',');
      console.log("El vector3 es:");
      console.log(vector3);
      return new Consulta(vector2[0], vector3);
    }

    this.esDefinicion = function(expresion) {
      var elementos = expresion.split('(');
      if(elementos.length == 2){
          return true;
      }
      return false;
    }

    this.esRegla = function(expresion) {
      var elementos = expresion.split(':-');
      if(elementos.length == 2){
          return true;
      }
      return false;
    }

    this.parsearDefinicion = function(expresion) {
      "Filtra un string y devuelve un objeto Definicion con los valores correspondientes a la expresion."
      "Obtengo un vector con dos posiciones, la primera es el nombre de la definicion y la segunda los argumentos."
      var vector1 = expresion.replace(/\)\.$/, "");
      var vector2 = vector1.split('(');

      //Creo una definicion
      return new Definicion(vector2[0], vector2[1]);
    }

    this.parsearRegla = function(expresion) {
      "Filtra un string de regla y devuelve un objeto Regla con los valores correspondientes a la expresion."
      "Ej: [[hijo] [X Y] [varon X] [padre Y X]]"
      var vector1 = expresion.replace(/\)\.$/, "");
      //Quito los espacios.
      var vector2 = vector1.replace(/\s/g, "");
      var vector3 = vector2.split(':-');
      var nombreRegla = vector3[0].replace(/\)$/, "");
      var definicionesRegla = vector3[1];
      var aux1 = nombreRegla.split('\(');
      var parametros = aux1[1].split(/[\),]/);
      var definiciones = definicionesRegla.split('\),');

      for (var i = 0; i < definiciones.length; i+=1) {
        definiciones[i] = definiciones[i].split(/[\(\),]/);
      }

      //var listaRegla = [aux1[0]].concat([aux2]).concat(aux3);

      //Creo una lista de definiciones.
      var listaDef = [];
      for (var i = 0; i < definiciones.length; i+=1) {
        var nombreRegla = definiciones[i][0];
        definiciones[i].shift()
        listaDef[i] = new Expresion(nombreRegla,definiciones[i]);
      }
      console.log("La lista de definiciones de la regla es:");
      console.log(listaDef);
      //Armo el objeto regla.
      return new Regla(aux1[0], parametros, listaDef);
    }

}

module.exports = Parser;
