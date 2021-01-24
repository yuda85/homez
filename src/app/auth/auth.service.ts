import { Injectable, Provider } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DatabaseService } from '../core/database.service';
import { SetUser } from '../state/auth/auth.actions';
import { AuthStateSelectors } from '../state/auth/auts.selectors';
import { IUser } from './models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any;
  private userSubject$: Subject<IUser> = new Subject();

  private isLoggedInSubject$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private store: Store
  ) {
    if (!!localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')).id;
    } else {
      this.user = null;
    }

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = {
          displayName: user.displayName,
          creationDate: user.metadata.creationTime,
          expensesEntered: '',
          lastLogin: user.metadata.lastSignInTime,
          id: user.uid,
          photoURL: user.photoURL,
        };
        this.store.dispatch(new SetUser(this.user));
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedInSubject$.next(true);
      } else {
        localStorage.setItem('user', JSON.stringify({}));
        this.isLoggedInSubject$.next(false);
      }
    });
  }

  public successLogin() {
    this.isLoggedInSubject$.next(true);
  }

  public updateUser(key: string, value: any) {
    this.user = {
      ...this.user,
      [key]: value,
    };
    this.store.dispatch(new SetUser(this.user));
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public getUserId(): string {
    return this.user.id;
  }

  public getUser(): Observable<IUser> {
    return this.store.select(AuthStateSelectors.user);
  }

  public async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedInSubject$.next(false);
    this.router.navigate(['/']);
  }
}
