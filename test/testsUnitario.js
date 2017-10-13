var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Parser = require('../src/parser');
var Consulta = require('../src/consulta');
var Definicion = require('../src/definicion');
var Regla = require('../src/regla');

describe("Parser", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var parser = null;
    var unaConsulta = null;
    var unaDefinicion = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        parser = new Parser();
        unaConsulta = new Consulta('varon', 'juan');
        unaDefinicion = new Definicion('padre', 'juan, pepe');
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Parser', function () {

        it('parsearConsulta(varon(juan)) should be true', function () {
            assert(parser.parsearConsulta('varon(juan)').getNombre() == unaConsulta.getNombre());
        });
        it('parsearConsulta(varon(juan)) should be true', function () {
            assert(parser.parsearConsulta('varon(juan)').getArgumentos() == unaConsulta.getArgumentos());
        });

        it('parsearDefinicion(padre(juan, pepe)) should be true', function () {
            assert(parser.parsearDefinicion('padre(juan, pepe)').getNombre() == unaDefinicion.getNombre());
        });
        it('parsearDefinicion(padre(juan, pepe)) should be true', function () {
            assert(parser.parsearDefinicion('padre(juan, pepe).').getArgumentos() == unaDefinicion.getArgumentos());
        });

        it('esConsultaValida(varon(juan)) should be true', function () {
            assert(parser.esConsultaValida('varon(juan)'));
        });

        it('esConsultaValida(varon) should be false', function () {
            assert(parser.esConsultaValida('varon') == false);
        });

        it('esDefinicion(varon(juan)) should be true', function () {
            assert(parser.esDefinicion('varon(juan)'));
        });

        it('esDefinicion(varon) should be false', function () {
            assert(parser.esDefinicion('varon') == false);
        });

        it('esRegla(hijo(X, Y) :- varon(X), padre(Y, X).) should be true', function () {
            assert(parser.esRegla('hijo(X, Y) :- varon(X), padre(Y, X).'));
        });

        it('esRegla(varon(juan)) should be false', function () {
            assert(parser.esRegla('varon(juan)') == false);
        });
    });
});
