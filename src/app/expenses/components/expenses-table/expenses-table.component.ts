import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../../auth/auth.service';
import { DatabaseService } from '../../../core/database.service';
import { Expense } from '../../models';

@Component({
  selector: 'app-expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss'],
})
export class ExpensesTableComponent implements OnInit {
  constructor(
    private database: DatabaseService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}
  expensesData = new MatTableDataSource<Expense>();
  ngOnInit(): void {
    this.database.getUserExpenses(this.auth.getUserId()).subscribe((data) => {
      this.data = data;
      console.log('DATA', data);
      this.expensesData = new MatTableDataSource<Expense>(this.data);
      this.expensesData.paginator = this.paginator;
      this.expensesData.sort = this.sort;
    });
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sorter', { static: true }) sort: MatSort;
  public data: Expense[] = [];
  public displayColumns: string[] = [
    'name',
    'amount',
    'date',
    'category',
    'type',
    'comments',
  ];

  ngAfterViewInit() {
    this.expensesData.sort = this.sort;
  }

  ngOnChanges(changes: any) {
    if (!changes.data.firstChange) {
      this.expensesData = new MatTableDataSource<Expense>(this.data);
      this.expensesData.paginator = this.paginator;
      this.expensesData.sort = this.sort;
    }
  }

  isDataEmpty(): boolean {
    return this.data.length === 0;
  }

  editData(expense: Expense) {
    // const dialogRef = this.dialog.open(ManageExpenseComponent, {
    //   data: expense as any,
    //   hasBackdrop: true,
    //   disableClose: true,
    // });
  }
}
