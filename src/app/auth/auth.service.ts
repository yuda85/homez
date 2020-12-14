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
    private db: DatabaseService,
    private store: Store
  ) {
    if (!!localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')).uid;
    } else {
      this.user = null;
    }

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.store.dispatch(new SetUser(user));
        if (this.db.isUserExist(user.uid)) {
        }
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedInSubject$.next(true);
      } else {
        localStorage.setItem('user', JSON.stringify({}));
        this.isLoggedInSubject$.next(false);
      }
    });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public getUserId(): string {
    return this.user.uid;
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
