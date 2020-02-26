import { Tokens, tokenList, AbstractTokens } from './lexer';

declare var chevrotain;

export class UlaParser extends chevrotain.CstParser {
    constructor() {
        super(tokenList);

        const $ = this;

        $.RULE('Expression', () => {
            $.SUBRULE($.AdditionExpression);
        });

        // Lowest precedence thus it is first in the rule chain
        // The precedence of binary expressions is determined by how far down the Parse Tree
        // The binary expression appears.
        $.RULE('AdditionExpression', () => {
            // using labels can make the CST processing easier
            $.SUBRULE($.MultiplicationExpression, { LABEL: 'izquierda' });
            $.MANY(() => {
                // consuming 'OperadorAdicion' will consume either Plus or Minus
                // as they are subclasses of OperadorAdicion
                $.CONSUME(AbstractTokens.OperadorAdicion);
                // the index "2" in SUBRULE2 is needed to identify the unique
                // position in the grammar during runtime
                $.SUBRULE2($.MultiplicationExpression, { LABEL: 'derecha' });
            });
        });

        $.RULE('MultiplicationExpression', () => {
            $.SUBRULE($.AtomicExpression, { LABEL: 'izquierda' });
            $.MANY(() => {
                $.CONSUME(AbstractTokens.OperadorMultiplicacion);
                //  the index "2" in SUBRULE2 is needed to identify the unique position in the
                // grammar during runtime
                $.SUBRULE2($.AtomicExpression, { LABEL: 'derecha' });
            });
        });

        $.RULE('AtomicExpression', () => {
            $.OR([
                // parenthesisExpression has the highest precedence and thus it appears
                // in the "lowest" leaf in the expression ParseTree.
                { ALT: () => $.SUBRULE($.ParenthesisExpression) },
                { ALT: () => $.CONSUME(Tokens.Entero) },
            ]);
        });

        $.RULE('ParenthesisExpression', () => {
            $.CONSUME(Tokens.ParentesisIzquierdo);
            $.SUBRULE($.Expression);
            $.CONSUME(Tokens.ParentesisDerecho);
        });

        $.RULE('Statement', () => {
            $.OR([
                { ALT: () => $.SUBRULE($.Expression) },
            ]);
            $.CONSUME(Tokens.PuntoComa);
        });

        $.RULE('SourceElements', () => {
            $.MANY(() => {
                $.OR([
                    { ALT: () => $.SUBRULE($.Statement) },
                ]);
            });
        });

        $.RULE('Program', () => {
            $.SUBRULE($.SourceElements);
        });

        // very important to call this after all the rules have been defined.
        // otherwise the parser may not work correctly as it will lack information
        // derived during the self analysis phase.
        this.performSelfAnalysis();
    }
}

export const parser = new UlaParser();


