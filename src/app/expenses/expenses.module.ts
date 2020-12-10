import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { RouterModule } from '@angular/router';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';
import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { LogExpensesComponent } from './components/log-expenses/log-expenses.component';

@NgModule({
  declarations: [ExpensesContainerComponent, NewExpenseComponent, ExpensesTableComponent, LogExpensesComponent],
  imports: [CommonModule, ExpensesRoutingModule],
  exports: [ExpensesContainerComponent],
})
export class ExpensesModule {}
