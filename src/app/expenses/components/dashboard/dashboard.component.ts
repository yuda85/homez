import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { DatabaseService } from 'src/app/core/database.service';
import { Expense } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public expensesData$: Observable<Array<Expense>>;

  constructor(
    private database: DatabaseService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.expensesData$ = this.database
      .getUserExpenses(userId)
      .pipe(filter((data) => !!data));
  }
}
