//leaves-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesContainerComponent,
  },
  {
    path: 'new-expense',
    component: NewExpenseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
