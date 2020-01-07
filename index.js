const chevrotain = require('chevrotain');
const util = require('util');
const fs = require('fs');

const { createToken, Lexer } = chevrotain;

const Identificador = createToken({
  name: 'Identificador',
  pattern: /[a-zA-Z](\w|\d)*/,
});

const Entero = createToken({
  name: 'Entero',
  pattern: /0|[1-9]\d*/,
});

const CadenaCaracteres = createToken({
  name: 'CadenaCaracteres',
  pattern: /"(\w|\d|\s)*"/,
});

const MayorQue = createToken({
  name: 'MayorQue',
  pattern: />/,
});

const MenorQue = createToken({
  name: 'MenorQue',
  pattern: /</,
});

const Crear = createToken({
  name: 'Crear',
  pattern: /crear/,
});

const Numero = createToken({
  name: 'Numero',
  pattern: /numero/,
});

const Mostrar = createToken({
  name: 'Mostrar',
  pattern: /mostrar/,
});

const Si = createToken({
  name: 'Condicional',
  pattern: /si/,
});

const EspacioBlanco = createToken({
  name: 'EspacioBlanco',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

const allTokens = [
  EspacioBlanco,
  // Palabras Clave
  Crear,
  Numero,
  Mostrar,
  Si,
  CadenaCaracteres,
  // Identificadores
  Identificador,
  Entero,
  MayorQue,
  MenorQue,
];

const lexer = new Lexer(allTokens);

const input = fs.readFileSync('./programa.ula').toString();
const output = lexer.tokenize(input);
console.log(input);
console.log(util.inspect(output, false, null, true));
