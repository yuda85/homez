import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn();
  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter();
  public isSidenavOpen: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public logOut(): void {
    this.auth.logout();
  }

  public onLoginClick(): void {
    this.router.navigate(['/login']);
  }

  public onHamburgerClick(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.toggleSidenav.emit(this.isSidenavOpen);
  }
}
