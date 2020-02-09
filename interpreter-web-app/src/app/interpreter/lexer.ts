declare var chevrotain;

export const AbstractTokens = {
    // Token abstracto que representa el tipo de operacion adicion (suma o resta)
    // se usa para clasificar y simplificar las definiciones en el parser.
    OperadorAdicion: chevrotain.createToken({
        name: 'OperadorAdicion',
        pattern: chevrotain.Lexer.NA,
    }),

    // Token abstracto que representa el tipo de operacion multiplicacion (multiplicación
    // o división) se usa para clasificar y simplificar las definiciones en el parser.
    OperadorMultiplicacion: chevrotain.createToken({
        name: 'OperadorMultiplicacion',
        pattern: chevrotain.Lexer.NA,
    }),

};
export const Tokens = {

    /** ************
     * Literaless *
     */
    Entero: chevrotain.createToken({
        name: 'Entero',
        pattern: /0|[1-9]\d*/,
    }),

    CadenaCaracteres: chevrotain.createToken({
        name: 'CadenaCaracteres',
        pattern: /"(\w|\d|\s)*"/,
    }),

    /** ************
     * Operadores
     */

    // comparadores

    MayorQue: chevrotain.createToken({
        name: 'MayorQue',
        pattern: />|mayor_que/,
    }),

    MenorQue: chevrotain.createToken({
        name: 'MenorQue',
        pattern: /<|menor_que/,
    }),

    MayorIgualQue: chevrotain.createToken({
        name: 'MayorIgualQue',
        pattern: />=|mayor_igual_que/,
    }),

    MenorIgualQue: chevrotain.createToken({
        name: 'MenorIgualQue',
        pattern: /<=|menor_igual_que/,
    }),

    IgualQue: chevrotain.createToken({
        name: 'IgualQue',
        pattern: /igual_que|==/,
    }),

    DiferenteA: chevrotain.createToken({
        name: 'DiferenteA',
        pattern: /(diferente_a|!=)/,
    }),

    // aritmeticos

    Suma: chevrotain.createToken({
        name: 'Suma',
        pattern: /\+|mas/,
        categories: AbstractTokens.OperadorAdicion,
    }),

    Resta: chevrotain.createToken({
        name: 'Resta',
        pattern: /-|menos/,
        categories: AbstractTokens.OperadorAdicion,
    }),

    Multiplicacion: chevrotain.createToken({
        name: 'Multiplicacion',
        pattern: /\*|por/,
        categories: AbstractTokens.OperadorMultiplicacion,
    }),

    Division: chevrotain.createToken({
        name: 'Division',
        pattern: /\/|entre/,
        categories: AbstractTokens.OperadorMultiplicacion,
    }),

    /** *********************
     * Palabras reservadas *
     */
    Identificador: chevrotain.createToken({
        name: 'Identificador',
        pattern: /[a-zA-Z](\w|\d)*/,
    }),

    Crear: chevrotain.createToken({
        name: 'Crear',
        pattern: /crear/,
    }),

    Numero: chevrotain.createToken({
        name: 'Numero',
        pattern: /numero/,
    }),

    Mostrar: chevrotain.createToken({
        name: 'Mostrar',
        pattern: /mostrar/,
    }),

    // condicionales

    Si: chevrotain.createToken({
        name: 'Condicional',
        pattern: /si/,
    }),

    CasoContrario: chevrotain.createToken({
        name: 'CasoContrario',
        pattern: /caso_contrario:/,
    }),

    // booleanos

    Verdadero: chevrotain.createToken({
        name: 'Verdadero',
        pattern: /verdadero/,
    }),

    Falso: chevrotain.createToken({
        name: 'Falso',
        pattern: /falso/,
    }),

    /**
     * Símbolos
     */
    ParentesisIzquierdo: chevrotain.createToken({
        name: 'ParentesisIzquierdo',
        pattern: /\(/,
    }),

    ParentesisDerecho: chevrotain.createToken({
        name: 'ParentesisDerecho',
        pattern: /\)/,
    }),

    Coma: chevrotain.createToken({
        name: 'Coma',
        pattern: /,/,
    }),

    PuntoComa: chevrotain.createToken({
        name: 'PuntoComa',
        pattern: /;/,
    }),

    /**
     * Ignorados
     */
    EspacioBlanco: chevrotain.createToken({
        name: 'EspacioBlanco',
        pattern: /\s+/,
        group: chevrotain.Lexer.SKIPPED,
    }),

    Comentario: chevrotain.createToken({
        name: 'Comentario',
        pattern: /\/\*.*?\*\//,
        group: chevrotain.Lexer.SKIPPED,
    }),

};
// Lista de Tokens
// Nota: ¡El orden es importante!

export const tokenList = [
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

export const lexer = new chevrotain.Lexer(tokenList);
