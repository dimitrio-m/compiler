import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CodeEditorModule } from '@ngstack/code-editor';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { InterpreterConsoleComponent } from './components/interpreter-console/interpreter-console.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeEditorComponent,
    InterpreterConsoleComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    CodeEditorModule.forRoot({
      baseUrl: 'assets/monaco',
      typingsWorkerUrl: 'assets/workers/typings-worker.js'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
