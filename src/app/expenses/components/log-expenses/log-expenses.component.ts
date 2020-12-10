import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../auth/login.service';
import { DatabaseService } from '../../../core/database.service';
import { Expense, expense_types } from '../../models';

@Component({
  selector: 'app-log-expenses',
  templateUrl: './log-expenses.component.html',
  styleUrls: ['./log-expenses.component.scss'],
})
export class LogExpensesComponent implements OnInit, OnDestroy {
  categories: string[] = this.loginService.getCurrentCategories();
  types: string[] = expense_types;
  expenseObj: Expense = {
    name: null as any,
    date: null as any,
    category: null as any,
    type: null as any,
    amount: null as any,
    comments: '',
  };
  isLoading = false;
  dateError = false;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private database: DatabaseService
  ) {
    database.categoriesAddedAnnounced$.subscribe((category) => {
      this.updateExpenseCategories(category);
    });
  }

  ngOnInit() {}

  updateExpenseCategories(category: string) {
    this.categories = this.loginService.getCurrentCategories();
  }

  saveExpenseEntry(expenseForm: any) {
    this.isLoading = true;
    if (typeof this.expenseObj.date !== 'string') {
      this.expenseObj.date = this.expenseObj.date.toDateString();
    }
    this.database
      .saveNewExpense(this.expenseObj, this.loginService.getUserId())
      .then((data) => {
        this.isLoading = false;
        expenseForm.resetForm();
        this.resetExpenseObj();
        this.showSnackBar();
        this.announceChange();
      })
      .catch((e) => {
        this.isLoading = false;
        console.log('Failed');
      });
  }

  announceChange() {
    this.database.announceExpenseCreated('new expense');
  }

  resetExpenseObj() {
    this.expenseObj = {
      name: null as any,
      date: null as any,
      category: null as any,
      type: null as any,
      amount: null as any,
      comments: '',
    };
  }

  showSnackBar() {
    this.snackBar.open('Expense saved!', '', { duration: 2000 });
  }

  save(value: any, valid: any, form: any) {
    if (valid) {
      this.saveExpenseEntry(form);
    }
  }

  checkDate(date: Date) {
    this.dateError = this.expenseObj.date == null;
  }

  clearForm(expenseForm: any) {
    this.dateError = false;
    expenseForm.resetForm();
    this.resetExpenseObj();
  }

  formatAmount() {
    if (this.expenseObj.amount !== null) {
      if (typeof this.expenseObj.amount !== 'string') {
        const rounded = this.expenseObj.amount.toFixed(2);
        this.expenseObj.amount = parseFloat(rounded);
      }
    }
  }

  ngOnDestroy(): void {}
}
