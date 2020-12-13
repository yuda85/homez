import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginService } from '../../../auth/login.service';
import { DatabaseService } from '../../../core/database.service';
import { Expense, expense_types } from '../../models';

@Component({
  selector: 'app-log-expenses',
  templateUrl: './log-expenses.component.html',
  styleUrls: ['./log-expenses.component.scss'],
})
export class LogExpensesComponent implements OnInit, OnDestroy {
  categories: string[] = ['בניה', 'ריצוף', 'פיניש'];
  types: string[] = expense_types;
  expenseObj: Expense = {
    name: null,
    date: null,
    category: null,
    type: null,
    amount: null,
    comments: '',
  };
  isLoading = false;
  dateError = false;

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private database: DatabaseService,
    private auth: AuthService
  ) {
    database.categoriesAddedAnnounced$.subscribe((category) => {
      this.updateExpenseCategories(category);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.database.getUserExpenses(this.auth.getUserId()).subscribe((data) => {
        console.log(data);
      });
    }, 2000);
  }

  updateExpenseCategories(category: string) {
    this.categories = this.loginService.getCurrentCategories();
  }

  saveExpenseEntry(expenseForm: any) {
    debugger;
    this.isLoading = true;
    if (typeof this.expenseObj.date !== 'string') {
      this.expenseObj.date = this.expenseObj.date.toDateString();
    }
    this.database.saveNewExpense(this.expenseObj, this.auth.getUserId());
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

  checkDate(date: any) {
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
