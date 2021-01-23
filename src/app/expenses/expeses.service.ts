import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from '../core/database.service';
import { Category, Expense, ExpensesInfo } from './models';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  constructor(private database: DatabaseService) {}

  public uploadFile(event: Event, userId: string, docId: string): void {
    this.database.uploadFile(event, userId, docId);
  }

  public deleteFileFromStorage(
    userId: string,
    docId: string,
    fileId: string
  ): void {
    this.database.deleteFileFromStorage(userId, docId, fileId);
  }

  public getUserExpenses(userId: string): Observable<any> {
    return this.database.getUserExpenses(userId);
  }

  public getExpensesCategories(userId: string) {
    return this.database.getExpensesCategories(userId);
  }

  public setExpensesCategories(userId: string, categories: Category[]): void {
    this.database.setExpensesCategories(userId, categories);
  }

  public saveNewExpense(expenseObj: Expense, userId: string): void {
    this.database.saveNewExpense(expenseObj, userId);
  }

  public deleteExpenseCategory(userId: string, category: Category): void {
    this.database.deleteExpenseCategory(userId, category);
  }
}
