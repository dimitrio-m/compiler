const util = require('util');
const fs = require('fs');

const {
  lexer,
} = require('./src/lexer');
const parser = require('./src/parser');
const interpreter = require('./src/interpreter');

const program = fs.readFileSync('./examples/programa.ula').toString();

const filteredProgram = program.split('\n').map((line) => (line.endsWith('*/') ? line : `${line};`)).join('\n');

// 1. "Tokenizar" la entrada
const lexResult = lexer.tokenize(filteredProgram);

// 2. "Parsear" el vector de tokens
parser.input = lexResult.tokens;
const cst = parser.Program();

if (parser.errors.length > 0) {
  console.error(parser.errors[0]);
  process.exit(1);
}

// 3. Ejecutar analisis semantico usando CstVisitor.
const value = interpreter.visit(cst);

const result = {
  value,
  lexResult,
  parseErrors: parser.errors,
};

console.log('\nEntrada:\n');
console.log(program);
console.log('\nSalida:\n');
console.log(result.value.join('\n'));
console.log('\n');
// console.log(util.inspect(result, false, null, true));
