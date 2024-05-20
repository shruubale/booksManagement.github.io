import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent  {
  addFormGroup: any = FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private mainService: MainService,
    private snackBar: MatSnackBar,
  ) {
    this.addFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.addFormGroup.valid) {
      this.showSpinner(true);
      this.mainService
        .AddBook(this.addFormGroup.value)
        .subscribe((response) => {
          this.showSpinner(false);
          console.log(response.message);
          this.addFormGroup.reset();
          this.router.navigateByUrl('book-list');
          this.openSnackBar(response.message);
        }
        );
    }
  }

  /**
   * routeToBack
   *
   * @route
   *
   * @navigate This function is used to back to previous location.
   *
   */
  routeToBack() {
    this.location.back();
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
        this.mainService.setShowProgressSpinner(status);
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
          verticalPosition:'top',
          horizontalPosition:'right',
          panelClass: 'my-custom-snackbar'
        });
      }
}
