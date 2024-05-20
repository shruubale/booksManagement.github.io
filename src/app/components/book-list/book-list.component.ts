import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { updateBook } from 'src/app/model/response';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  _id: string;
  name: string;
  price: string;
  description: string;
  __v: 0;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  arrResponse: any = [];
  displayedColumns: string[] = ['name', 'price', 'description', 'actions'];
  dataSource: any;
  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(
    private service: MainService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.getBookList();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getBookList() {
    this.service.getBookList().subscribe((response) => {
      this.ELEMENT_DATA = [];
      this.arrResponse = response.data;
      this.ELEMENT_DATA = this.ELEMENT_DATA.concat(this.arrResponse);
      this.dataSource = new MatTableDataSource<PeriodicElement>(
        this.ELEMENT_DATA
      );
      this.dataSource.paginator = this.paginator;
    });
  }

  addBook() {
    this.router.navigateByUrl('/add-book');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(details: any) {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      data: {
        Details: details,
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBookList();
    });
  }

  deleteBook(_id) {
    this.service.deleteBook(_id).subscribe((response) => {
      console.log(response.message);
      this.openSnackBar(response.message);
      this.getBookList();
    });
  }

  /**
   * showSpinner
   *
   * @status
   *
   * @returns This function is used to display the loading indicator. This function accepts one input as status
   * i.e. boolean value. If the status is true, Then this function display the loading indicator and if the status is false,
   * This function hide the loading indicator.
   */

  showSpinner(status: boolean) {
    this.service.setShowProgressSpinner(status);
  }
  
  /**
   * openSnackBar
   *
   * @message
   *
   * @returns This function is used to display the snack bar with given message.
   *
   */

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }


  routeToPath(){
    this.router.navigateByUrl('/book-detail')
  }
}
