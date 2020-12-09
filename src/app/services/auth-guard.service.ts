import { Injectable, OnDestroy } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(private _router: Router, private _auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    // return true;
    return this._auth.isLoggedIn().pipe(filter((data) => !!data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
