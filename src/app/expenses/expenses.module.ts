import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { RouterModule } from '@angular/router';
import { ExpensesContainerComponent } from './components/expenses-container/expenses-container.component';

import { ExpensesTableComponent } from './components/expenses-table/expenses-table.component';
import { LogExpensesComponent } from './components/log-expenses/log-expenses.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ExpensesContainerComponent,
    ExpensesTableComponent,
    LogExpensesComponent,
  ],
  imports: [CommonModule, ExpensesRoutingModule, FormsModule, MaterialModule],
  exports: [ExpensesContainerComponent],
})
export class ExpensesModule {}
