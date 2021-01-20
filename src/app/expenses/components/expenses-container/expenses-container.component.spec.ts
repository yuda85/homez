import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesContainerComponent } from './expenses-container.component';

describe('ExpensesContainerComponent', () => {
  let component: ExpensesContainerComponent;
  let fixture: ComponentFixture<ExpensesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
