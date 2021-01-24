import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'homez';

  public isSidenavOpen: boolean = false;
  public isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn();

  constructor(private auth: AuthService) {}

  public logout(): void {
    this.auth.logout();
  }

  public isLoggedIn(): Observable<boolean> {
    return this.auth.isLoggedIn();
  }

  public handleToggleSideNav(event: boolean): void {
    this.isSidenavOpen = event;
  }

  public onSideNavItemClick(): void {
    this.isSidenavOpen = false;
  }
}
