import { Component, OnInit } from '@angular/core';
import { CustomEventsService } from '../../services/custom-events.service';
import { lexer } from '../../interpreter/lexer';
import { parser, UlaParser } from '../../interpreter/parser';
import { UlaInterpreter } from '../../interpreter/interpreter';

@Component({
  selector: 'app-interpreter-console',
  templateUrl: './interpreter-console.component.html',
  styleUrls: ['./interpreter-console.component.css']
})
export class InterpreterConsoleComponent implements OnInit {

  private textCode = '';

  public lexer: any;
  public parser: UlaParser;
  public interpreter: UlaInterpreter;

  public result: {
    value: string[];
    lexResult: any;
    parseErrors: any;
  } = {
    value: [],
    lexResult: undefined,
    parseErrors: undefined
  };

  constructor(
    private customEventsService: CustomEventsService
  ) {
    this.lexer = lexer;
    this.parser = parser;
    this.interpreter = new UlaInterpreter();
  }

  ngOnInit() {

    this.customEventsService.subscribe('TEXT:CODE').subscribe(
      value => {
        console.log('resived', value);
        this.textCode = value;
        this.runInterpreter();
      },
      err => console.error(err)
    );

  }

  private runInterpreter(): void {

    if (this.textCode === undefined) {
      console.log('TextCode', undefined);
      return;
    }
    const lexResult = this.lexer.tokenize(this.textCode);
    this.parser.input = lexResult.tokens;
    const cst = this.parser.Program();

    if (this.parser.errors.length > 0) {
      console.error(this.parser.errors[0]);
      // process.exit(1);
    }

    // 3. Ejecutar analisis semantico usando CstVisitor.
    const value = this.interpreter.visit(cst);

    this.result = {
      value,
      lexResult,
      parseErrors: this.parser.errors,
    };

    // console.log('\nEntrada:\n');
    // console.log(program);
    if (this.result && this.result.value) {
      console.log('\nSalida:\n');
      console.log(this.result.value.join('\n'));

    }
    console.log(this.result);

    // console.log('\n');
  }

}
