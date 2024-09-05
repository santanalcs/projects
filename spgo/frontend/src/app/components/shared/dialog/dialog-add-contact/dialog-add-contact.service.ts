import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContractorService } from 'src/app/components/views/contractor/contractor.service';
import { AuthService } from 'src/app/components/views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { Contact } from 'src/app/models/contractor.model';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { DialogAddAddressComponent } from '../dialog-add-address/dialog-add-address.component';

@Injectable({
  providedIn: 'root'
})
export class DialogAddContactService {
  msg: string = "";
  isError: boolean = false;

  contact: Contact = {
    id_contractor: 0,//his.data.id_contractor,
    name_contractor:  '',//this.data.contractor,
    contact: '',
    cel_phone: '',
    email: '',
  }

  constructor(/*private cardService: CardService,*/ private contractorkService: ContractorService, private dialog: MatDialog, 
    private contractorService: ContractorService, private snackBar:SnackBarService, private authService: AuthService,
    private authGuardService: AuthGuardService) {
      /*cardService.subtitle = {
        text: 'Cadastrar Contato',
        icon: 'contact_page',
      }*/
  }

  public confirm(contact: any): void {
    console.log(contact)
    //const dialogRef = this.dialogRef
    this.contractorService.createContact(contact, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        console.log(res.error)
        res.error.contact?this.msg = res.error.contact.msg:
        res.error.cel_phone?this.msg = res.error.cel_phone.msg:
        res.error.email?this.msg = res.error.email.msg:
        this.msg = res.error.msg;
        this.isError = true;
        //console.log(res)
      }else if (res.success){
        this.msg = res.success.msg;
        this .dialog.closeAll();

        this.contractorService.indexContractor(contact.cpf_cnpj).subscribe(res => {
          
          this.contact.id_contractor = res.contractor.id;
          this.contact.name_contractor = res.contractor.name;

          const dialogRef = this.dialog.open(DialogAddAddressComponent,{
            //data: {id_contractor: this.contact.id_contractor, contractor: this.contact.id_contractor.toUpperCase()},
            data: {
              entity: contact.entity,
              id_contractor: res.contractor.id, 
              name: res.contractor.name,
              zip_code: "",
              action: 'Cadastrar',
              //origin: 'dialog',
            },
          })

        })

        /*const dialogRef = this.dialog.open(DialogCreateAddressComponent,{
          //data: {id_contractor: this.contact.id_contractor, contractor: this.contact.id_contractor.toUpperCase()},
          data: {
            id_contractor: this.contact.id_contractor, 
            contractor: this.contact.name_contractor,
            zip_code: "",
          },
        })*/
       /* dialogRef.afterClosed().subscribe( (res: boolean) => {
          if(res){
            const dialogRef = this.dialog.open(DialogCreateAddressComponent,{
              data: {id_contractor: this.contact.id_contractor, contractor: this.data.contractor.toUpperCase()},
            })
          }
        })*/
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }
}
