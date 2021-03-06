import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import * as firebase from 'firebase';
import * as uuid from 'uuid';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Expense } from '../expenses/models/expenses.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, finalize, map, take, tap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../auth/auth.service';
import { Category, ExpensesInfo } from '../expenses/models';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements OnDestroy {
  private expenseAddedSource = new Subject<string>();
  private categoriesAddedSource = new Subject<string>();
  public userId: string;
  private subscription: Subscription = new Subscription();

  public expenseAddedAnnounced$ = this.expenseAddedSource.asObservable();
  public categoriesAddedAnnounced$ = this.categoriesAddedSource.asObservable();
  uploadPercent: any;
  downloadURL: any;
  private exitingCategories: Category[] = [];

  constructor(
    public db: AngularFireDatabase,
    private _db: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthService
  ) {
    this.subscription.add(
      this.auth
        .getUser()
        .pipe(filter((data) => !!data))
        .subscribe((data) => {
          this.userId = data.id;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

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
            return { ...doc.payload.doc.data(), id: doc.payload.doc.id };
          });
        }),
        tap((data) => {
          this.auth.updateUser('expensesEntered', data.length);
        })
      );
  }

  public getUserFiles(userId: string): Observable<any[]> {
    return this._db
      .collection('users')
      .doc(userId)
      .collection('files')
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            return { ...doc.payload.doc.data(), id: doc.payload.doc.id };
          });
        })
      );
  }

  public setExpensesCategories(
    userId: string,
    listOfCategories: Array<Category>
  ): void {
    if (this.userId) {
      const exitingCategories = this.exitingCategories.map(
        (data) => data.value
      );
      listOfCategories.forEach((category) => {
        this._db
          .collection('users')
          .doc(userId)
          .collection('categories')
          .add({ value: category.value, removable: category.removable });
      });
    }
  }

  public getExpensesCategories(userId: string): Observable<Array<Category>> {
    return this._db
      .collection('users')
      .doc(userId)
      .collection('categories')
      .snapshotChanges()
      .pipe(
        filter((data) => !!data),
        map((docArray) => {
          return docArray.map((doc) => {
            return {
              ...(doc.payload.doc.data() as Category),
              id: doc.payload.doc.id,
            };
          });
        }),
        tap((data) => {
          this.exitingCategories = data;
        })
      );
  }

  public deleteExpenseCategory(userId: string, category: Category): void {
    this._db
      .collection('users')
      .doc(userId)
      .collection('categories')
      .doc(category.id)
      .delete();
  }

  public getUserDetails(currentUser: any): Promise<DataSnapshot> {
    return this.db.database
      .ref('users/')
      .orderByChild('email')
      .equalTo(currentUser)
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

  public uploadFile(event, userId, docId) {
    const file = event.target.files[0];
    const fileId = uuid.v4();
    const filePath = `/${userId}/${fileId}`;

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef
            .getDownloadURL()

            .subscribe((fileUrl) => {
              console.log('boom Shakalak');
              this._db
                .collection('users')
                .doc(userId)
                .collection('expenses')
                .doc(docId)
                .update({ fileUrl: fileUrl });
            });
        })
      )
      .subscribe();

    this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .doc(docId)
      .update({ file: file.name, fileId: fileId });
  }

  public deleteFileFromStorage(
    userId: string,
    docId: string,
    fileId: string
  ): void {
    const filePath = `/${userId}/${fileId}`;

    const fileRef = this.storage.ref(filePath);
    fileRef.delete();
    this._db
      .collection('users')
      .doc(userId)
      .collection('expenses')
      .doc(docId)
      .update({ file: null, fileId: null });
  }

  public isUserExist(id: string): boolean {
    return false;
  }
}
