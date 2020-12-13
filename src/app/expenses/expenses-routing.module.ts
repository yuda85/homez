//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';
import { LogExpensesComponent } from './components/log-expenses/log-expenses.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'new',
    component: LogExpensesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
