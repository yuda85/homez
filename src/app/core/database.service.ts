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

  expenseAddedAnnounced$ = this.expenseAddedSource.asObservable();
  categoriesAddedAnnounced$ = this.categoriesAddedSource.asObservable();

  constructor(public db: AngularFireDatabase, private _db: AngularFirestore) {}

  announceExpenseCreated(mission: string) {
    this.expenseAddedSource.next(mission);
  }

  announceCategoriesAdded(mission: string) {
    this.categoriesAddedSource.next(mission);
  }

  saveNewExpense(expense: Expense, userId: string) {
    debugger;
    this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .add(expense);
    // this._db.collection(userId).add({ expense: expense });
  }

  getUserExpenses(userId: string): Observable<any[]> {
    // return this.db.list('users/' + userId + '/expenses').snapshotChanges();
    return this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            console.log(doc.payload.doc.data());
            return doc.payload.doc.data();
          });
        })
      );
  }

  saveNewCategories(categories: string[], userId: string): Promise<any> {
    return this.db.database
      .ref('users/' + userId + '/categories')
      .set(categories);
  }

  getUserDetails(currentUser: any): Promise<DataSnapshot> {
    return this.db.database
      .ref('users/')
      .orderByChild('email')
      .equalTo(currentUser)
      .once('value');
  }

  getCurrentCategories(userId: string): Promise<DataSnapshot> {
    return this.db.database
      .ref('users/' + userId + '/categories')
      .once('value');
  }

  getExpensesOnce(userId: string): Promise<DataSnapshot> {
    return this.db.database.ref('users/' + userId + '/expenses').once('value');
  }

  updateExpense(userId: string, key: string, expense: Expense): Promise<void> {
    return this.db.list('users/' + userId + '/expenses').update(key, expense);
  }

  deleteExpense(userId: string, key: string): Promise<void> {
    return this.db.list('users/' + userId + '/expenses').remove(key);
  }

  addUser(userId: string): void {
    this.db.database.ref('users').push(userId);
  }

  isUserExist(id: string): boolean {
    debugger;
    console.log(this.db.list('users'));

    return false;
  }
}
