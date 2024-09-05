import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  hidden: boolean = false
  btn: string = 'Sim'

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>, @Inject (MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if(this.data.hidden){
      this.hidden = this.data.hidden;
      this.btn = this.data.btn;
    }
  }

  public confirm(res: boolean): void {
    this .dialogRef.close(res);
  }

}
