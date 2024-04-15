import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent {

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService){
    cardService.subtitle = {
      text: 'Alterar Nível de Acesso',
      icon: 'edit_note',
    }
  }
 
  public confirm(res: User): void {
    this .dialogRef.close(res);
  }

  public closeDialog(): void {
    this .dialogRef.close();
  }
}
