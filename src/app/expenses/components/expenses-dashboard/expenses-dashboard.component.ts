import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { ExpensesService as ExpensesService } from '../../expeses.service';
import { Expense } from '../../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './expenses-dashboard.component.html',
  styleUrls: ['./expenses-dashboard.component.scss'],
})
export class ExpensesDashboardComponent implements OnInit {
  public expensesData$: Observable<Array<Expense>>;
  public pieChartData$: Observable<Array<{ [key: string]: object }>>;
  public lineChartData$: Observable<Array<{ [key: string]: object }>>;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.expensesData$ = this.expensesService
      .getUserExpenses(userId)
      .pipe(filter((data) => !!data));

    this.pieChartData$ = this.expensesData$.pipe(
      map((expenses) => {
        const _pieData = {};
        const finalPieData = [];

        expenses.forEach((expense) => {
          if (
            _pieData[expense.category.value] &&
            _pieData[expense.category.value].length
          ) {
            _pieData[expense.category.value].push(expense);
          } else {
            _pieData[expense.category.value] = [expense];
          }
        });
        const keys = Object.keys(_pieData);
        keys.forEach((cat, i) => {
          finalPieData[i] = {
            category: cat,
            amount: _pieData[cat]
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
          };
        });

        return finalPieData;
      })
    );

    this.lineChartData$ = this.expensesData$.pipe(
      map((expenses) => {
        const lineData = {};
        const finalLineData = [];

        expenses.forEach((expense) => {
          if (
            lineData[expense.date as string] &&
            lineData[expense.date as string].length
          ) {
            lineData[expense.date as string].push(expense);
          } else {
            lineData[expense.date as string] = [expense];
          }
        });
        const keys = Object.keys(lineData);
        keys.forEach((date, i) => {
          finalLineData[i] = {
            date: date,
            value: lineData[date]
              .map((expense) => expense.amount)
              .reduce((a, b) => a + b, 0),
          };
        });

        return finalLineData.sort((a, b) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return (new Date(a.date) as any) - (new Date(b.date) as any);
        });
      })
    );
  }
}
