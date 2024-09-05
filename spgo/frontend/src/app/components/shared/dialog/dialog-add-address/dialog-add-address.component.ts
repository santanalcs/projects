import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
//import { AuthService } from 'src/app/components/views/user/auth.service';
//import { AuthGuardService } from 'src/app/guards/authguard.service';
import { Address } from 'src/app/models/contractor.model';
import { DialogAddAddressService } from './dialog-add-address.service';

@Component({
  selector: 'app-dialog-add-address',
  templateUrl: './dialog-add-address.component.html',
  styleUrls: ['./dialog-add-address.component.css']
})
export class DialogAddAddressComponent {
  mask: string = '';
  maxlength_input_zip_code: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddAddressComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService, private dialogAddAdrressService: DialogAddAddressService,/*private authGuardService: AuthGuardService,
  private authService: AuthService,*/ ){
    cardService.subtitle = {
      text: `${this.data.action} Endereço`,
      icon: 'home',
    }
  }

  public maskCep():void{ 
    this.mask = '#####-###';
    this.maxlength_input_zip_code = '9'
    let i = this.data.zip_code.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.data.zip_code += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public closeDialog(): void {
    console.log('Endereco')
    this.dialogRef.close();
  }

  public sendData(data: Address): void {
   this.data.entity == "Proprietario"?this.dialogAddAdrressService.constructionAddressServices(data):null;
   this.data.entity == "Empreiteiro"?this.dialogAddAdrressService.contractorAddressServices(data):null;
  }
}
