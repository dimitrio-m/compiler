
import { Tokens } from './lexer';
import { parser } from './parser';

declare var chevrotain;

// const chevrotain = require('chevrotain');
// const util = require('util');
// const parser = require('./parser');
// const lexer = require('./lexer');

// const { tokenMatcher } = chevrotain;
// const { Tokens } = lexer;

const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

// All our semantics go into the visitor, completly separated from the grammar.
export class UlaInterpreter extends BaseCstVisitor {
    constructor() {
        super();
        // This helper will detect any missing or redundant methods on this visitor
        this.validateVisitor();
    }


    Expression(ctx) {
        // visiting an array is equivalent to visiting its first element.
        return this.visit(ctx.AdditionExpression);
    }

    // Note the usage if the "derecha" and "izquierda" labels to increase the readability.
    AdditionExpression(ctx) {
        // console.log(ctx);
        let result = this.visit(ctx.izquierda);
        // "derecha" key may be undefined as the grammar defines it as optional (MANY === zero or more).
        if (ctx.derecha) {
            ctx.derecha.forEach((operandoDerecho, idx) => {
                console.log(operandoDerecho, idx);
                // there will be one operator for each derecha operand
                const valor = this.visit(operandoDerecho);
                const operador = ctx.OperadorAdicion[idx];

                if (chevrotain.tokenMatcher(operador, Tokens.Suma)) {
                    result += valor;
                } else {
                    // Resta
                    result -= valor;
                }
            });
        }

        return result;
    }

    MultiplicationExpression(ctx) {
        let result = this.visit(ctx.izquierda);

        // "derecha" key may be undefined as the grammar defines it as optional (MANY === zero or more).
        if (ctx.derecha) {
            ctx.derecha.forEach((operandoDerecho, idx) => {
                // there will be one operator for each derecha operand
                const valor = this.visit(operandoDerecho);
                const operador = ctx.OperadorMultiplicacion[idx];

                if (chevrotain.tokenMatcher(operador, Tokens.Multiplicacion)) {
                    result *= valor;
                } else {
                    // Division
                    result /= valor;
                }
            });
        }

        return result;
    }

    // eslint-disable-next-line consistent-return
    AtomicExpression(ctx) {
        if (ctx.ParenthesisExpression) {
            return this.visit(ctx.ParenthesisExpression);
        }

        if (ctx.Entero) {
            return parseInt(ctx.Entero[0].image, 10);
        }
    }

    ParenthesisExpression(ctx) {
        // The ctx will also contain the parenthesis tokens, but we don't care about those
        // in the context of calculating the result.
        return this.visit(ctx.Expression);
    }

    Statement(ctx) {
        return this.visit(ctx.Expression);
    }

    SourceElements(ctx) {
        return ctx.Statement.map((statement) => this.visit(statement));
    }

    Program(ctx) {
        return this.visit(ctx.SourceElements);
    }
}

// We only need a single interpreter instance because our interpreter has no state.
export const interpreter = new UlaInterpreter();
