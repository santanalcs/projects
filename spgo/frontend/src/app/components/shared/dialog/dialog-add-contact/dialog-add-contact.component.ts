import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { DialogAddContactService } from './dialog-add-contact.service';
import { DialogAddAddressComponent } from '../dialog-add-address/dialog-add-address.component';

@Component({
  selector: 'app-dialog-add-contact',
  templateUrl: './dialog-add-contact.component.html',
  styleUrls: ['./dialog-add-contact.component.css']
})
export class DialogAddContactComponent {
  mask: string = '';
  maxlength_input_tel: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddContactComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService, /*private contractorkService: ContractorService,*/ private dialog: MatDialog, 
 /* private snackBar:SnackBarService, private authService: AuthService,
  private authGuardService: AuthGuardService*/ private dialogAddContactService: DialogAddContactService) {
    cardService.subtitle = {
      text: 'Cadastrar Contato',
      icon: 'contact_page',
    }
  }

  public maskTel():void{ 
    this.mask = '## #####-####';
    this.maxlength_input_tel = '13'
    let i = this.data.cel_phone.length;
    console.log(i)
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.data.cel_phone += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public closeDialog(): void {
    if(this.data.origin == 'page'){
      const dialogRef = this.dialog.open(DialogAddAddressComponent,{
        data: {
         id_contractor: this.data.id_contractor, 
         name: this.data.contractor.toUpperCase(),
         zip_code: "",
       },
      })
    }
      this .dialogRef.close();
      this.cardService.subtitle.text = 'Cadastrar Empreiteiro';
      this.cardService.subtitle.icon = 'engineering';
   }

   teste(data: any){
    console.log(data)
    this.data.entity == "Empreiteiro"?this.dialogAddContactService.confirm(data):null;
   }
}
