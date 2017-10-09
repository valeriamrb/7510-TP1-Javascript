var Consulta = require('../src/consulta');
var Expresion = require('../src/expresion');
var Definicion = require('../src/definicion');
var Regla = require('../src/regla');

function Parser() {
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
      var vector2 = vector1.split('(');
      //Separo por coma y espacio.
      var vector3 = vector2[1].split(', ');
      return new Consulta(vector2[0], vector3);
    }

    this.esConsultaValida = function(expresion){
      var vector1 = expresion.replace(/\)$/, "");
      var vector2 = vector1.split('(');
      if(vector2.length == 2){
        return true;
      }
      return false;
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
      //Creo una lista de definiciones.
      var listaDef = [];
      for (var i = 0; i < definiciones.length; i+=1) {
        var nombreRegla = definiciones[i][0];
        definiciones[i].shift()
        listaDef[i] = new Expresion(nombreRegla,definiciones[i]);
      }
      //Armo el objeto regla.
      return new Regla(aux1[0], parametros, listaDef);
    }

    this.validarBase = function(listaDatos) {
      //Valida si la base de datos esta formada correctamente.
      var listaDefValidas = [];
      var listaReglasValidas = [];
      var elementoIncompleto = 0;
      for (var i = 0; i < listaDatos.length; i+=1) {
         if(this.esDefinicion(listaDatos[i])) {
           listaDefValidas.push(listaDatos[i]);
         } else if(this.esRegla(listaDatos[i])) {
           listaReglasValidas.push(listaDatos[i]);
         } else {
           elementoIncompleto = i;
         }
      }
      var cantidadDefValidas = listaDefValidas.length;
      var cantidadReglasValidas = listaReglasValidas.length;
      var cantidadLineasValidas = cantidadDefValidas + cantidadReglasValidas;
      var cantidadLineasTotales = listaDatos.length;
      if(cantidadLineasTotales == cantidadLineasValidas){
        return true;
      }
      console.log("Error en el elemento numero " + i + " de la base de datos");
      return false;
    }
}

module.exports = Parser;
