import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningDashboardComponent } from './planning-dashboard.component';

describe('PlanningDashboardComponent', () => {
  let component: PlanningDashboardComponent;
  let fixture: ComponentFixture<PlanningDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
