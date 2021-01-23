import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesDashboardComponent } from './expenses-dashboard.component';

describe('DashboardComponent', () => {
  let component: ExpensesDashboardComponent;
  let fixture: ComponentFixture<ExpensesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});