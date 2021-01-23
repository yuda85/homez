//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesDashboardComponent } from './components/expenses-dashboard/expenses-dashboard.component';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { LogExpensesComponent } from './components/log-expenses/log-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesDashboardComponent,
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
