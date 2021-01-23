import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { RouterModule } from '@angular/router';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';

import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { LogExpensesComponent } from './components/log-expenses/log-expenses.component';
import { MaterialModule } from '../material/material.module';
import { ExpensesDashboardComponent } from './components/expenses-dashboard/expenses-dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ExpensesContainerComponent,
    ExpensesTableComponent,
    LogExpensesComponent,
    ExpensesDashboardComponent,
  ],
  imports: [CommonModule, ExpensesRoutingModule, MaterialModule, SharedModule],
  exports: [ExpensesContainerComponent],
})
export class ExpensesModule {}
