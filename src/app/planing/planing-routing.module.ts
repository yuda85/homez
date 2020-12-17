import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningDashboardComponent } from './components/planning-dashboard/planning-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: PlanningDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaningRoutingModule {}
