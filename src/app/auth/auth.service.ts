import { Injectable, Provider } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: any;

  private isLoggedInSubject$: Subject<boolean> = new Subject<boolean>();

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe((user) => {
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
    this.router.navigate(['/']);
  }
}
