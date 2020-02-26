import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterConsoleComponent } from './interpreter-console.component';

describe('InterpreterConsoleComponent', () => {
  let component: InterpreterConsoleComponent;
  let fixture: ComponentFixture<InterpreterConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpreterConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
