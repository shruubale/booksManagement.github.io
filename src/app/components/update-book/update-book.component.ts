import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Location } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  Details: any;
  updateFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private mainService: MainService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.Details = this.data.Details;
    console.log(this.Details);

    this.updateFormGroup = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.setFormControlsValue();
  }

  setFormControlsValue() {
    console.log(this.Details);
    this.updateFormGroup.controls.name.setValue(this.Details.name);
    this.updateFormGroup.controls.price.setValue(this.Details.price);
    this.updateFormGroup.controls.description.setValue(
      this.Details.description
    );
  }

  getdata() {
    const formData = {
      name: this.updateFormGroup.controls.name.value,
      price: this.updateFormGroup.controls.price.value,
      description: this.updateFormGroup.controls.description.value,
    };
    return formData;
  }

  update() {
    if (this.updateFormGroup.valid) {
      this.showSpinner(true);
      console.log(this.getdata());
      this.mainService
        .updateBook(this.Details._id, this.getdata())
        .subscribe((response) => {
          console.log(response);
          this.showSpinner(false);
          this.dialogRef.close();
          this.openSnackBar(response.message);
          this.router.navigateByUrl('book-list');
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
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
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: 'my-custom-snackbar',
    });
  }
  
}
