import { Component, Inject } from '@angular/core';
import { ContractorService } from '../../contractor.service';
import { CardService } from 'src/app/components/templates/card.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contractor.model';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AddressDialogCreateComponent } from '../../address/address-dialog-create/address-dialog-create.component';
import { AuthService } from '../../../user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
//import { DialogCreateAddressComponent } from 'src/app/components/shared/dialog/dialog-create-address/dialog-create-address.component';
import { DialogAddAddressComponent } from 'src/app/components/shared/dialog/dialog-add-address/dialog-add-address.component';

@Component({
  selector: 'app-contact-dialog-create',
  templateUrl: './contact-dialog-create.component.html',
  styleUrls: ['./contact-dialog-create.component.css']
})
export class ContactDialogCreateComponent {
  msg: string = "";
  isError: boolean = false;

  contact: Contact = {
    id_contractor: this.data.id_contractor,
    name_contractor: this.data.contractor,
    contact: '',
    cel_phone: '',
    email: '',
  }

mask: string = '';
maxlength_input_tel: string = '';
  
  constructor(public dialogRef: MatDialogRef<ContactDialogCreateComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService, private contractorkService: ContractorService, private dialog: MatDialog, 
  private contractorService: ContractorService, private snackBar:SnackBarService, private authService: AuthService,
  private authGuardService: AuthGuardService) {
    cardService.subtitle = {
      text: 'Cadastrar Contato',
      icon: 'contact_page',
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
  }

  public maskTel():void{ 
    this.mask = '## #####-####';
    this.maxlength_input_tel = '13'
    let i = this.contact.cel_phone.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.contact.cel_phone += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public confirm(): void {
    const dialogRef = this.dialogRef
    this.contractorService.createContact(this.contact, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        console.log(res.error)
        res.error.contact?this.msg = res.error.contact.msg:
        res.error.cel_phone?this.msg = res.error.cel_phone.msg:
        res.error.email?this.msg = res.error.email.msg:
        this.msg = res.error.msg;
        this.isError = true;
      }else if (res.success){
        this.msg = res.success.msg;
        this .dialogRef.close(res);

        this.contractorService.indexContractor(this.data.cpf_cnpj).subscribe(res => {
          console.log(res)
          this.contact.id_contractor = res.contractor.cpf_cnpj;
        })
        dialogRef.afterClosed().subscribe( (res: boolean) => {
          if(res){
            const dialogRef = this.dialog.open(DialogAddAddressComponent,{
              data: {
                id_contractor: this.contact.id_contractor, 
                contractor: this.data.contractor.toUpperCase(),
                atction: 'Cadastrar',
                origin: 'dialog',
              },
            })
          }
        })
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public closeDialog(): void {
   // if(res){
      const dialogRef = this.dialog.open(AddressDialogCreateComponent,{
        data: {id_contractor: this.data.id_contractor, contractor: this.data.contractor.toUpperCase()},
      })
   // }
    this .dialogRef.close();
    this.cardService.subtitle.text = 'Cadastrar Empreiteiro';
    this.cardService.subtitle.icon = 'engineering';
  }

}
