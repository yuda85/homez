import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaningRoutingModule } from './planing-routing.module';
import { PlanningContainerComponent } from './components/planning-container/planning-container.component';
import { PlanningDashboardComponent } from './components/planning-dashboard/planning-dashboard.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PlanningContainerComponent, PlanningDashboardComponent],
  imports: [CommonModule, PlaningRoutingModule, MaterialModule, SharedModule],
  exports: [PlanningContainerComponent],
})
export class PlaningModule {}
