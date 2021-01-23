import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn();
  @Output() toggleSidenav: EventEmitter<boolean> = new EventEmitter();

  @Input() set sidenavOpen(isSidnavOpen: boolean) {
    this.isSidenavOpen = isSidnavOpen;
  }
  public isSidenavOpen: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public logOut(): void {
    this.auth.logout();
  }

  public onLoginClick(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public onHamburgerClick(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.toggleSidenav.emit(this.isSidenavOpen);
  }
}
