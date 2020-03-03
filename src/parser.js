const chevrotain = require('chevrotain');
const lexer = require('./lexer');

const { CstParser } = chevrotain;
const { Tokens, tokenList } = lexer;

class UlaParser extends CstParser {
  constructor() {
    super(tokenList);

    const $ = this;

    $.RULE('program', () => {
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
    });

    $.RULE('statement', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.ifStatement) },
        { ALT: () => $.SUBRULE($.whileStatement) },
        { ALT: () => $.SUBRULE($.doStatement) },
        { ALT: () => $.SUBRULE($.blockStatement) },
        { ALT: () => $.SUBRULE($.expressionStatement) },
        { ALT: () => $.SUBRULE($.emptyStatement) },
      ]);
    });

    $.RULE('ifStatement', () => {
      $.CONSUME(Tokens.If);
      $.SUBRULE($.paren_expr);
      $.SUBRULE($.statement);
      $.OPTION(() => {
        $.CONSUME(Tokens.Else);
        $.SUBRULE2($.statement);
      });
    });

    $.RULE('whileStatement', () => {
      $.CONSUME(Tokens.While);
      $.SUBRULE($.paren_expr);
      $.SUBRULE($.statement);
    });

    $.RULE('doStatement', () => {
      $.CONSUME(Tokens.Do);
      $.SUBRULE($.statement);
      $.CONSUME(Tokens.While);
      $.SUBRULE($.paren_expr);
      $.CONSUME(Tokens.SemiColon);
    });

    $.RULE('blockStatement', () => {
      $.CONSUME(Tokens.LCurly);
      $.MANY(() => {
        $.SUBRULE($.statement);
      });
      $.CONSUME(Tokens.RCurly);
    });

    $.RULE('expressionStatement', () => {
      $.SUBRULE($.expression);
      $.CONSUME(Tokens.SemiColon);
    });

    $.RULE('expression', () => {
      $.OR([
        { ALT: () => $.SUBRULE($.assignExpression) },
        { ALT: () => $.SUBRULE($.relationExpression) },
      ]);
    });

    $.RULE('relationExpression', () => {
      $.SUBRULE($.AdditionExpression, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(Tokens.RelationalOperator);
        $.SUBRULE2($.AdditionExpression, { LABEL: 'rhs' });
      });
    });

    $.RULE('AdditionExpression', () => {
      // using labels can make the CST processing easier
      $.SUBRULE($.multiplicationExpression, { LABEL: 'lhs' });
      $.MANY(() => {
        // consuming 'AdditionOperator' will consume either Plus or Minus
        $.CONSUME(Tokens.AdditionOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar
        $.SUBRULE2($.multiplicationExpression, { LABEL: 'rhs' });
      });
    });

    $.RULE('multiplicationExpression', () => {
      $.SUBRULE($.term, { LABEL: 'lhs' });
      $.MANY(() => {
        $.CONSUME(Tokens.MultiplicationOperator);
        //  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar
        $.SUBRULE2($.term, { LABEL: 'rhs' });
      });
    });

    $.RULE('assignExpression', () => {
      $.CONSUME(Tokens.ID);
      $.CONSUME(Tokens.Equals);
      $.SUBRULE($.expression);
    });

    $.RULE('term', () => {
      $.OR([
        { ALT: () => $.CONSUME(Tokens.ID) },
        { ALT: () => $.CONSUME(Tokens.INT) },
        { ALT: () => $.SUBRULE($.paren_expr) },
      ]);
    });

    $.RULE('paren_expr', () => {
      $.CONSUME(Tokens.LParen);
      $.SUBRULE($.expression);
      $.CONSUME(Tokens.RParen);
    });

    $.RULE('emptyStatement', () => {
      $.CONSUME(Tokens.SemiColon);
    });

    // very important to call this after all the rules have been defined.
    // otherwise the parser may not work correctly as it will lack information
    // derived during the self analysis phase.
    this.performSelfAnalysis();
  }
}

const parser = new UlaParser([]);

module.exports = parser;
