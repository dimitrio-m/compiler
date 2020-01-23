const chevrotain = require('chevrotain');

const { createToken, Lexer } = chevrotain;

// Definición de Tokens

const AbstractTokens = {
  // Token abstracto que representa el tipo de operacion adicion (suma o resta)
  // se usa para clasificar y simplificar las definiciones en el parser.
  OperadorAdicion: createToken({
    name: 'OperadorAdicion',
    pattern: Lexer.NA,
  }),

  // Token abstracto que representa el tipo de operacion multiplicacion (multiplicación
  // o división) se usa para clasificar y simplificar las definiciones en el parser.
  OperadorMultiplicacion: createToken({
    name: 'OperadorMultiplicacion',
    pattern: Lexer.NA,
  }),

};

const Tokens = {

  /** ************
 * Literaless *
 ************* */
  Entero: createToken({
    name: 'Entero',
    pattern: /0|[1-9]\d*/,
  }),

  CadenaCaracteres: createToken({
    name: 'CadenaCaracteres',
    pattern: /"(\w|\d|\s)*"/,
  }),

  /** ************
 * Operadores *
 ************* */

  // comparadores

  MayorQue: createToken({
    name: 'MayorQue',
    pattern: />|mayor_que/,
  }),

  MenorQue: createToken({
    name: 'MenorQue',
    pattern: /<|menor_que/,
  }),

  MayorIgualQue: createToken({
    name: 'MayorIgualQue',
    pattern: />=|mayor_igual_que/,
  }),

  MenorIgualQue: createToken({
    name: 'MenorIgualQue',
    pattern: /<=|menor_igual_que/,
  }),

  IgualQue: createToken({
    name: 'IgualQue',
    pattern: /igual_que|==/,
  }),

  DiferenteA: createToken({
    name: 'DiferenteA',
    pattern: /(diferente_a|!=)/,
  }),

  // aritmeticos

  Suma: createToken({
    name: 'Suma',
    pattern: /\+|mas/,
    categories: AbstractTokens.OperadorAdicion,
  }),

  Resta: createToken({
    name: 'Resta',
    pattern: /-|menos/,
    categories: AbstractTokens.OperadorAdicion,
  }),

  Multiplicacion: createToken({
    name: 'Multiplicacion',
    pattern: /\*|por/,
    categories: AbstractTokens.OperadorMultiplicacion,
  }),

  Division: createToken({
    name: 'Division',
    pattern: /\/|entre/,
    categories: AbstractTokens.OperadorMultiplicacion,
  }),

  /** *********************
 * Palabras reservadas *
 ********************** */
  Identificador: createToken({
    name: 'Identificador',
    pattern: /[a-zA-Z](\w|\d)*/,
  }),

  Crear: createToken({
    name: 'Crear',
    pattern: /crear/,
  }),

  Numero: createToken({
    name: 'Numero',
    pattern: /numero/,
  }),

  Mostrar: createToken({
    name: 'Mostrar',
    pattern: /mostrar/,
  }),

  // condicionales

  Si: createToken({
    name: 'Condicional',
    pattern: /si/,
  }),

  CasoContrario: createToken({
    name: 'CasoContrario',
    pattern: /caso_contrario:/,
  }),

  // booleanos

  Verdadero: createToken({
    name: 'Verdadero',
    pattern: /verdadero/,
  }),

  Falso: createToken({
    name: 'Falso',
    pattern: /falso/,
  }),

  /** **********
 * Símbolos *
 *********** */
  ParentesisIzquierdo: createToken({
    name: 'ParentesisIzquierdo',
    pattern: /\(/,
  }),

  ParentesisDerecho: createToken({
    name: 'ParentesisDerecho',
    pattern: /\)/,
  }),

  Coma: createToken({
    name: 'Coma',
    pattern: /,/,
  }),

  PuntoComa: createToken({
    name: 'PuntoComa',
    pattern: /;/,
  }),

  /** ***********
 * Ignorados *
 ************ */
  EspacioBlanco: createToken({
    name: 'EspacioBlanco',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
  }),

  Comentario: createToken({
    name: 'Comentario',
    pattern: /\/\*.*?\*\//,
    group: Lexer.SKIPPED,
  }),

};
// Lista de Tokens
// Nota: ¡El orden es importante!

const allTokens = [
  Tokens.Comentario,
  Tokens.EspacioBlanco,
  // Palabras Clave
  Tokens.Crear,
  Tokens.Mostrar,
  Tokens.Si,
  Tokens.CasoContrario,
  Tokens.Numero,
  // Literales
  Tokens.CadenaCaracteres,
  Tokens.Entero,
  Tokens.Verdadero,
  Tokens.Falso,
  // Operadores
  AbstractTokens.OperadorAdicion,
  AbstractTokens.OperadorMultiplicacion,
  Tokens.Suma,
  Tokens.Resta,
  Tokens.Multiplicacion,
  Tokens.Division,
  Tokens.MayorQue,
  Tokens.MenorQue,
  Tokens.DiferenteA,
  Tokens.MayorIgualQue,
  Tokens.MenorIgualQue,
  Tokens.IgualQue,
  // Identificador
  Tokens.Identificador,
  // Simbolos
  Tokens.ParentesisDerecho,
  Tokens.ParentesisIzquierdo,
  Tokens.Coma,
  Tokens.PuntoComa,
];

const lexer = new Lexer(allTokens);

module.exports = {
  lexer,
  Tokens,
  tokenList: allTokens,
  AbstractTokens,
};
