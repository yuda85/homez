import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningContainerComponent } from './planning-container.component';

describe('PlanningContainerComponent', () => {
  let component: PlanningContainerComponent;
  let fixture: ComponentFixture<PlanningContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
