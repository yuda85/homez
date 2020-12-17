import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ExpensesContainerComponent } from './expenses/components/expenses-container/expenses-container.component';
import { PlanningContainerComponent } from './planing/components/planning-container/planning-container.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./expenses/expenses.module').then((m) => m.ExpensesModule),
    component: ExpensesContainerComponent,
  },
  {
    path: 'planning',
    loadChildren: () =>
      import('./planing/planing.module').then((m) => m.PlaningModule),
    component: PlanningContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
