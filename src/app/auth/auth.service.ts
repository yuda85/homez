import { Injectable, Provider } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any;

  private isLoggedInSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
      debugger;
      if (user) {
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

  public async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.isLoggedInSubject$.next(false);
  }
}
