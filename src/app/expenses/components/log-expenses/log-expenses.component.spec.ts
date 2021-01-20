import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExpensesComponent } from './log-expenses.component';

describe('LogExpensesComponent', () => {
  let component: LogExpensesComponent;
  let fixture: ComponentFixture<LogExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
