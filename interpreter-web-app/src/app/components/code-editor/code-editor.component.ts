import { Component, Input } from '@angular/core';

import { CustomEventsService } from '../../services/custom-events.service';

export interface CodeModel {
  language?: string;
  value: string;
  uri?: string;

  dependencies?: Array<string>;
  schemas?: Array<{
    uri: string;
    schema: object;
  }>;
}
declare var chevrotain;
// declare var Lexer;
// declare var lexer;
// declare var chevrotain.createToken;

const defaultCode = `
  /* Operaciones Aritmenticas con valores literales */
  3 por (1 + 2);
  2 mas 2;
  7;
`;

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent {

  @Input() activeTheme = 'vs';
  @Input() readOnly = false;
  @Input()
  // code = [
  //   `import { TranslateModule, TranslateService } from '@ngstack/translate';`,
  //   `import { CodeEditorModule } from '@ngstack/code-editor';`,
  //   `import * as fs from 'fs';`,
  //   '',
  //   `export class MyClass {`,
  //   `  constructor(translate: TranslateService) {`,
  //   '',
  //   '  }',
  //   `}`
  // ].join('\n');

  // code = '';

  // codeModel: CodeModel = {
  //   language: 'json',
  //   uri: 'main.json',
  //   value: '{}'
  // };


  codeModel: CodeModel = {
    // language: 'json',
    // uri: 'main.json',
    value: defaultCode,
    // schemas: [
    //   {
    //     uri: 'http://custom/schema.json',
    //     schema: {
    //       type: 'object',
    //       properties: {
    //         type: {
    //           enum: ['button', 'textbox']
    //         }
    //       }
    //     }
    //   }
    // ]
  };

  // dependencies: string[] = [
  //   '@types/node',
  //   '@ngstack/translate',
  //   '@ngstack/code-editor'
  // ];

  dependencies = [];

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    // lineHeight: 300

  };

  private currentLines = 0;

  constructor(
    private customEventsService: CustomEventsService
  ) {
    // Definición de Tokens

    console.log('c', chevrotain);

  }

  onCodeChanged(value: string) {
    // console.log('CODE', value);
    const lines = value.split('\n').length;

    if (lines !== this.currentLines) {
        console.log('send', value);

        this.customEventsService.publish('TEXT:CODE', value);
    }
  }

  onRequireSubmmit(): void {
      console.log('send', this.codeModel.value);

      this.customEventsService.publish('TEXT:CODE', this.codeModel.value);
  }

}
