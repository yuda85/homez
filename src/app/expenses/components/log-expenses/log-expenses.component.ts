import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseService } from '../../../core/database.service';
import { Expense, expense_types } from '../../models';

@Component({
  selector: 'app-log-expenses',
  templateUrl: './log-expenses.component.html',
  styleUrls: ['./log-expenses.component.scss'],
})
export class LogExpensesComponent implements OnInit, OnDestroy {
  public categories: string[] = ['בניה', 'ריצוף', 'פיניש'];
  public types: string[] = expense_types;
  public expenseObj: Expense = {
    name: null,
    date: null,
    category: null,
    type: null,
    amount: null,
    comments: '',
  };
  public isLoading = false;
  public dateError = false;

  constructor(
    private snackBar: MatSnackBar,
    private database: DatabaseService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  public saveExpenseEntry(expenseForm: any) {
    this.isLoading = true;
    if (typeof this.expenseObj.date !== 'string') {
      this.expenseObj.date = this.expenseObj.date.toDateString();
    }
    this.database.saveNewExpense(this.expenseObj, this.auth.getUserId());
  }

  public announceChange() {
    this.database.announceExpenseCreated('new expense');
  }

  private showSnackBar() {
    this.snackBar.open('Expense saved!', '', { duration: 2000 });
  }

  public save(value: any, valid: any, form: any) {
    if (valid) {
      this.saveExpenseEntry(form);
      this.clearForm(form);
      this.showSnackBar();
    }
  }

  public checkDate(date: any) {
    this.dateError = this.expenseObj.date == null;
  }

  public clearForm(expenseForm: any) {
    this.dateError = false;
    expenseForm.resetForm();
    this.resetExpenseObj();
  }

  public formatAmount() {
    if (this.expenseObj.amount !== null) {
      if (typeof this.expenseObj.amount !== 'string') {
        const rounded = this.expenseObj.amount.toFixed(2);
        this.expenseObj.amount = parseFloat(rounded);
      }
    }
  }

  private resetExpenseObj() {
    this.expenseObj = {
      name: null as any,
      date: null as any,
      category: null as any,
      type: null as any,
      amount: null as any,
      comments: '',
    };
  }
}
