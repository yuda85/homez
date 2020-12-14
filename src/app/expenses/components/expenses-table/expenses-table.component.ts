import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class ExpensesTableComponent implements AfterViewInit {
  private _data: Array<Expense>;

  constructor() {}

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('sorter', { static: true }) sort: MatSort;

  @Input() set data(data: Array<Expense>) {
    this._data = data;
    if (!!data && data.length) {
      this.expensesData = new MatTableDataSource<Expense>(data);
      this.expensesData.paginator = this.paginator;
      this.expensesData.sort = this.sort;
    }
  }

  // public data: Expense[] = [];
  public expensesData = new MatTableDataSource<Expense>();
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

  public editData(expense: Expense) {
    // const dialogRef = this.dialog.open(ManageExpenseComponent, {
    //   data: expense as any,
    //   hasBackdrop: true,
    //   disableClose: true,
    // });
  }

  public doFilter(e: Event) {
    const target = e.target as HTMLInputElement;
    this.expensesData.filter = target.value.trim().toLowerCase();
  }
}
