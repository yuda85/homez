import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import * as firebase from 'firebase';

import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Expense } from '../expenses/models/expenses.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private expenseAddedSource = new Subject<string>();
  private categoriesAddedSource = new Subject<string>();

  public expenseAddedAnnounced$ = this.expenseAddedSource.asObservable();
  public categoriesAddedAnnounced$ = this.categoriesAddedSource.asObservable();

  constructor(public db: AngularFireDatabase, private _db: AngularFirestore) {}

  public announceExpenseCreated(mission: string): void {
    this.expenseAddedSource.next(mission);
  }

  public announceCategoriesAdded(mission: string): void {
    this.categoriesAddedSource.next(mission);
  }

  public saveNewExpense(expense: Expense, userId: string): void {
    this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .add(expense);
  }

  public getUserExpenses(userId: string): Observable<any[]> {
    return this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return doc.payload.doc.data();
          });
        })
      );
  }

  public saveNewCategories(categories: string[], userId: string): Promise<any> {
    return this.db.database
      .ref('users/' + userId + '/categories')
      .set(categories);
  }

  public getUserDetails(currentUser: any): Promise<DataSnapshot> {
    return this.db.database
      .ref('users/')
      .orderByChild('email')
      .equalTo(currentUser)
      .once('value');
  }

  public getCurrentCategories(userId: string): Promise<DataSnapshot> {
    return this.db.database
      .ref('users/' + userId + '/categories')
      .once('value');
  }

  public getExpensesOnce(userId: string): Promise<DataSnapshot> {
    return this.db.database.ref('users/' + userId + '/expenses').once('value');
  }

  public updateExpense(
    userId: string,
    key: string,
    expense: Expense
  ): Promise<void> {
    return this.db.list('users/' + userId + '/expenses').update(key, expense);
  }

  public deleteExpense(userId: string, key: string): Promise<void> {
    return this.db.list('users/' + userId + '/expenses').remove(key);
  }

  public addUser(userId: string): void {
    this.db.database.ref('users').push(userId);
  }

  public isUserExist(id: string): boolean {
    return false;
  }
}
