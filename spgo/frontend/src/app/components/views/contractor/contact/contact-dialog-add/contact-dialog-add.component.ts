import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { Contact } from 'src/app/models/contractor.model';
import { ContractorService } from '../../contractor.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { EMPTY } from 'rxjs';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../../user/auth.service';

@Component({
  selector: 'app-contact-dialog-add',
  templateUrl: './contact-dialog-add.component.html',
  styleUrls: ['./contact-dialog-add.component.css']
})
export class ContactDialogAddComponent {
  msg: string = "";
  isError: boolean = false;

  disabled = false;

  contact: Contact = {
    id: 0,
    id_contractor: this.data.id_contractor,
    name_contractor: this.data.contractor,
    contact: '',
    cel_phone: '',
    email: '',
  }

  action: string = this.data.contact_atction;

  mask: string = '';
  maxlength_input_tel: string = '';

  constructor(public dialogRef: MatDialogRef<ContactDialogAddComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private contractorService: ContractorService, private snackBar:SnackBarService, private cardService: CardService,
  private authGuardService: AuthGuardService, private authService: AuthService, ){
    cardService.subtitle = {
      text: `${this.action} Contato`,
      icon: 'contact_page',
    }
  }

  ngOnInit(): void {
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
    if(this.action =='Atualizar'){
      this.contact.id = this.data.id_contact;
      this.contact.contact = this.data.contact;
      this.contact.cel_phone = this.data.cel_phone;
      this.contact.email = this.data.email;
      this.disabled = true;
    }
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
  
  public confirm(): void{
    if(this.action == 'Cadastrar'){
      //console.log(this.authGuardService.guard.token)
      this.contractorService.createContact(this.contact, this.authGuardService.guard.token).subscribe(res => {
        if(res.error){
          res.error.contact?this.msg = res.error.contact.msg:
          res.error.cel_phone?this.msg = res.error.cel_phone.msg:
          res.error.email?this.msg = res.error.email.msg:
          this.msg = res.error.msg;
          this.isError = true;
        }else if (res.success){
          this.msg = res.success.msg;
          this.dialogRef.close(res);
        }
          this.snackBar.showMessage(this.msg, this.isError);
          this.isError = false;
      })
    }
    if(this.action == 'Atualizar'){
      this.contractorService.editContact(this.contact, this.authGuardService.guard.token).subscribe((res) => {
        if(res.error){
          res.error.cel_phone?this.msg = res.error.cel_phone.msg:
          res.error.email?this.msg = res.error.email.msg:
          this.msg = res.error.msg;
          this.isError = true;
        } else if (res.success){
          this.msg = res.success.msg
          this.isError = false;
          this.dialogRef.close(res);
        }
        this.snackBar.showMessage(this.msg, this.isError);
      })
    }
  }
    
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
