// const util = require('util');
const fs = require('fs');
const util = require('util');

const {
  lexer,
} = require('./src/lexer');
const parser = require('./src/parser');
const interpreter = require('./src/interpreter');

const inputProgram = fs.readFileSync('./examples/programa.ula').toString();

// 0. Agregar ; al final de lineas
// TODO: mejorar implementacion cuando es una linea con comentario

// 1. "Tokenizar" la entrada
const lexResult = lexer.tokenize(`${inputProgram}`);

// 2. "Parsear" el vector de tokens
parser.input = lexResult.tokens;
const cst = parser.program();

if (parser.errors.length > 0) {
  console.error(parser.errors[0]);
  process.exit(1);
}

// 3. Ejecutar analisis semantico usando CstVisitor.
const value = interpreter.visit(cst);

const result = {
  cst,
  lexErrors: lexResult.errors,
  parseErrors: parser.errors,
  jsCode: value,
};

console.log('\nEntrada:\n');
console.log(inputProgram);
console.log('\nSalida:\n');
console.log(result);
console.log('\n');
