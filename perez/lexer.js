/* eslint-disable no-restricted-syntax */
const chevrotain = require('chevrotain');
const util = require('util');
const fs = require('fs');

const { createToken, Lexer } = chevrotain;

const addTokens = (_allTokens, _tokens) => {
  for (const tokenConfg of _tokens) {
    const token = createToken({
      name: tokenConfg.name,
      pattern: tokenConfg.pattern,
    });

    _allTokens.push(token);
  }
};

const addTokensWithGroup = (_allTokens, _tokens) => {
  for (const tokenConfg of _tokens) {
    const token = createToken({
      name: tokenConfg.name,
      pattern: tokenConfg.pattern,
      group: tokenConfg.group,

    });

    _allTokens.push(token);
  }
};


const tokens_especiales = [
  {
    name: 'ESPACIO_BLANCO',
    pattern: /\s+/,
    group: Lexer.SKIPPED,
  },
];


const tokens_operadoresCondicionales = [
  {
    name: 'MAYOR_QUE',
    pattern: /(mayor_que|>)/,
  },
  {
    name: 'MAYOR_IGUAL_QUE',
    pattern: /(mayor_igual_que|>=)/,
  },
  {
    name: 'MENOR_QUE',
    pattern: /(menor_que|<)/,
  },
  {
    name: 'MENOR_IGUAL_QUE',
    pattern: /(menor_igual_que|<=)/,
  },

  {
    name: 'IGUAL_QUE',
    pattern: /(igual_que|==)/,
  },

  {
    name: 'DIFERENTE_A',
    pattern: /(diferente_a|!=)/,
  },
];

const tokens_operadoresAritmeticos = [
  {
    name: 'OP_MULTIPLICACION',
    pattern: /(por|\*)/,
  },
  {
    name: 'OP_DIVISION',
    pattern: /(entre|\/)/,
  },
  {
    name: 'OP_SUNMA',
    pattern: /(mas|\+)/,
  },
  {
    name: 'OP_MODULO',
    pattern: /(modulo|%)/,
  },
];

const tokens_valoresPredefinidos = [
  {
    name: 'VAL_VERDADERO',
    pattern: /verdadero/,
  },

  {
    name: 'VAL_FALSO',
    pattern: /falso/,
  },
  {
    name: 'VAL_INDEFINIDO',
    pattern: /indefinido/,
  },
];

const tokens_palabrasReservadas_condicionales = [
  {
    name: 'COND_SI',
    pattern: /si/,
  },
  {
    name: 'COND_CASO_CONTRARIO',
    pattern: /caso_contrario:/,
  },
];

const tokens_palabrasReservadas_variables = [
  {
    name: 'CREAR',
    pattern: /crear/,
  },
  {
    name: 'VARIABLE',
    pattern: /variable/,
  },
  {
    name: 'ASIGNAR',
    pattern: /ASIGNAR/,
  },
  {
    name: 'A',
    pattern: /a/,
  },
  {
    name: 'ELIMINAR',
    pattern: /eliminar/,
  },
];
const tokens_print = [
  {
    name: 'MOSTRAR',
    pattern: /mostrar:/,
  },
];

const tokens_generales = [
  {
    name: 'IDENTIFICADOR',
    pattern: /[a-zA-Z](\w|\d)*/,
  },
  {
    name: 'ENTERO',
    pattern: /0|[1-9]\d*/,
  },
  {
    name: 'CADENA_CARACTERES',
    pattern: /"(\w|\d|\s)*"/,
  },

];

const allTokens = [];

addTokensWithGroup(allTokens, tokens_especiales);
addTokens(allTokens, tokens_operadoresCondicionales);
addTokens(allTokens, tokens_operadoresAritmeticos);
addTokens(allTokens, tokens_valoresPredefinidos);
addTokens(allTokens, tokens_palabrasReservadas_condicionales);
addTokens(allTokens, tokens_palabrasReservadas_variables);
addTokens(allTokens, tokens_print);
addTokens(allTokens, tokens_generales);

const lexer = new Lexer(allTokens);

const input = fs.readFileSync('./programa.ula').toString();
const output = lexer.tokenize(input);
console.log(input);
console.log(util.inspect(output, false, null, true));
