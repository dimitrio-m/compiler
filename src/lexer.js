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

  // Token abstracto que representa el tipo de operacion logico (igualque
  // o menorque) se usa para clasificar y simplificar las definiciones en el parser.
  OperadorLogico: createToken({
    name: 'OperadorLogico',
    pattern: Lexer.NA,
  }),

  // Token abstracto que representa palabras reservadas
  NombreIdentificador: createToken({
    name: 'NombreIdentificador',
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
    categories: AbstractTokens.OperadorLogico,
  }),

  MenorQue: createToken({
    name: 'MenorQue',
    pattern: /<|menor_que/,
    categories: AbstractTokens.OperadorLogico,
  }),

  MayorIgualQue: createToken({
    name: 'MayorIgualQue',
    pattern: />=|mayor_igual_que/,
    categories: AbstractTokens.OperadorLogico,
  }),

  MenorIgualQue: createToken({
    name: 'MenorIgualQue',
    pattern: /<=|menor_igual_que/,
    categories: AbstractTokens.OperadorLogico,
  }),

  IgualQue: createToken({
    name: 'IgualQue',
    pattern: /igual_que|==/,
    categories: AbstractTokens.OperadorLogico,
  }),

  DiferenteA: createToken({
    name: 'DiferenteA',
    pattern: /(diferente_a|!=)/,
    categories: AbstractTokens.OperadorLogico,
  }),

  Exclamacion: createToken({
    name: 'Exclamacion',
    pattern: /!/,
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

  MasMas: createToken({
    name: 'MasMas',
    pattern: /\+\+/,
  }),

  MenosMenos: createToken({
    name: 'MenosMenos',
    pattern: /--/,
  }),

  BarraBarra: createToken({
    name: 'BarraBarra',
    pattern: /\|\|/,
  }),

  AmpersandAmpersand: createToken({
    name: 'AmpersandAmpersand',
    pattern: /&&/,
  }),

  /** *********************
 * Palabras reservadas *
 ********************** */
  Identificador: createToken({
    name: 'Identificador',
    pattern: /[a-zA-Z](\w|\d)*/,
  }),

  Nuevo: createToken({
    name: 'Nuevo',
    pattern: /nuevo/,
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

  Es: createToken({
    name: 'Es',
    pattern: /es|=/,
  }),

  Hacer: createToken({
    name: 'Hacer',
    pattern: /hacer/,
  }),

  Mientras: createToken({
    name: 'Mientras',
    pattern: /mientras/,
  }),

  Continuar: createToken({
    name: 'Continuar',
    pattern: /continuar/,
  }),

  Parar: createToken({
    name: 'Parar',
    pattern: /parar/,
  }),

  Retornar: createToken({
    name: 'Retornar',
    pattern: /retornar/,
  }),

  Funcion: createToken({
    name: 'Funcion',
    pattern: /funcion/,
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

  CorcheteDerecho: createToken({
    name: 'CorcheteDerecho',
    pattern: /\]/,
  }),

  CorcheteIzquierdo: createToken({
    name: 'CorcheteIzquierdo',
    pattern: /\[/,
  }),

  LlaveDerecha: createToken({
    name: 'LlaveDerecha',
    pattern: /\}/,
  }),

  LlaveIzquierda: createToken({
    name: 'LlaveIzquierda',
    pattern: /\{/,
  }),

  Coma: createToken({
    name: 'Coma',
    pattern: /,/,
  }),

  DosPuntos: createToken({
    name: 'DosPuntos',
    pattern: /:/,
  }),

  PuntoComa: createToken({
    name: 'PuntoComa',
    pattern: /;/,
  }),

  Punto: createToken({
    name: 'Punto',
    pattern: /./,
  }),

  Pregunta: createToken({
    name: 'Pregunta',
    pattern: /\?/,
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
  Tokens.Nuevo,
  Tokens.Crear,
  Tokens.Mostrar,
  Tokens.Si,
  Tokens.CasoContrario,
  Tokens.Numero,
  Tokens.Es,
  Tokens.Hacer,
  Tokens.Mientras,
  Tokens.Continuar,
  Tokens.Parar,
  Tokens.Retornar,
  Tokens.Funcion,
  // Literales
  Tokens.CadenaCaracteres,
  Tokens.Entero,
  Tokens.Verdadero,
  Tokens.Falso,
  // Operadores
  AbstractTokens.OperadorAdicion,
  AbstractTokens.OperadorMultiplicacion,
  AbstractTokens.OperadorLogico,
  Tokens.MasMas,
  Tokens.MenosMenos,
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
  Tokens.Exclamacion,
  Tokens.BarraBarra,
  Tokens.AmpersandAmpersand,
  // Identificador
  Tokens.Identificador,
  // Simbolos
  Tokens.ParentesisDerecho,
  Tokens.ParentesisIzquierdo,
  Tokens.CorcheteDerecho,
  Tokens.CorcheteIzquierdo,
  Tokens.LlaveIzquierda,
  Tokens.LlaveDerecha,
  Tokens.Coma,
  Tokens.DosPuntos,
  Tokens.PuntoComa,
  Tokens.Punto,
  Tokens.Pregunta,
];

const lexer = new Lexer(allTokens);

module.exports = {
  lexer,
  Tokens,
  tokenList: allTokens,
  AbstractTokens,
};
