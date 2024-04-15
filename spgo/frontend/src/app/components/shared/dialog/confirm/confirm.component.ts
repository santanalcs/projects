import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject (MAT_DIALOG_DATA) public data: string) {}
    
  ngOnInit(): void {

  }

  public confirm(res: boolean): void {
    this .dialogRef.close(res);
  }

}
