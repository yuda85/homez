import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips/chip-input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseService } from '../../../core/database.service';
import { Category, Expense, expense_types } from '../../models';
import { cloneDeep, find, includes, isEqual, transform, pick } from 'lodash';
import { ENTER } from '@angular/cdk/keycodes';
import { Subscriber, Subscription } from 'rxjs';
import { IUser } from 'src/app/auth/models';
import { filter } from 'rxjs/operators';
import { ExpensesService } from '../../expeses.service';

export interface UserDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  expensesEntered?: number;
  lastLogin?: string;
  creationDate?: string;
}
@Component({
  selector: 'app-log-expenses',
  templateUrl: './log-expenses.component.html',
  styleUrls: ['./log-expenses.component.scss'],
})
export class LogExpensesComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private userId: string = this.auth.getUserId();

  public user: IUser;

  readonly separatorKeysCodes: number[] = [ENTER];
  public categories: Array<Category> = [
    {
      value: 'תכנון',
      removable: false,
      id: null,
    },
    {
      value: 'בניה',
      removable: false,
      id: null,
    },
    {
      value: 'פיניש',
      removable: false,
      id: null,
    },
  ];

  public originalCategories: {
    value: string;
    removable: boolean;
  }[] = cloneDeep(this.categories);

  get categoriesUpdated(): boolean {
    return !isEqual(this.categories, this.originalCategories);
  }
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
  public isLoadingUserInformation: boolean = false;
  isLoadingCategories: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.isLoadingUserInformation = true;
    this.subscription.add(
      this.auth.getUser().subscribe((data) => {
        this.isLoadingUserInformation = false;
        this.user = data;
      })
    );

    this.subscription.add(
      this.expensesService
        .getExpensesCategories(this.userId)
        .pipe(filter((data) => !!data))
        .subscribe((data) => {
          this.isLoadingCategories = false;

          if (!data.length) {
            debugger;
            this.setBaseCategories();
          } else {
            this.categories = data;
          }
        })
    );
  }

  private setBaseCategories(): void {
    this.expensesService.setExpensesCategories(this.userId, this.categories);
  }

  ngOnDestroy(): void {}

  public saveExpenseEntry(expenseForm: any) {
    this.isLoading = true;
    if (typeof this.expenseObj.date !== 'string') {
      this.expenseObj.date = this.expenseObj.date.toDateString();
    }
    this.expensesService.saveNewExpense(this.expenseObj, this.userId);
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

  resetCategories() {
    this.categories = cloneDeep(this.originalCategories);
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

  public onCategoryEntered(data: MatChipInputEvent) {
    const valueTrimmed = data.value.trim();
    const newCategory = { value: data.value, removable: true, id: null };
    const matchingCategory = find(
      this.categories,
      (c) =>
        c.value === valueTrimmed ||
        c.value.toLowerCase() === valueTrimmed.toLowerCase()
    );
    if (!matchingCategory) {
      this.categories.push({ value: data.value, removable: true, id: null });
      data.input.value = null;
      debugger;
      this.expensesService.setExpensesCategories(this.userId, [newCategory]);
      this.penSnackBar('קטגוריה נשמרה');
    }
  }

  public removeCategory(data: string, index: number) {
    this.expensesService.deleteExpenseCategory(
      this.userId,
      this.categories[index]
    );
  }

  private penSnackBar(message) {
    this.snackBar.open(message, '', { duration: 2000 });
  }
}
