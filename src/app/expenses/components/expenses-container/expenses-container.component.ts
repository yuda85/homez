import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/models';

@Component({
  selector: 'app-expenses-container',
  templateUrl: './expenses-container.component.html',
  styleUrls: ['./expenses-container.component.scss'],
})
export class ExpensesContainerComponent implements OnInit {
  public user$: Observable<IUser>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user$ = this.auth.getUser();
  }
}
