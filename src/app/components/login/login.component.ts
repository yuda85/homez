import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(
      this.auth
        .isLoggedIn()
        .pipe(filter((data) => data !== undefined))
        .subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/']);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public successCallback(event: FirebaseUISignInSuccessWithAuthResult) {
    console.log(event);
  }
}
