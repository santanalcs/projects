import { Component, ElementRef, ViewChild } from '@angular/core';
import { ContractorService } from '../../contractor/contractor.service';
import { CardService } from 'src/app/components/templates/card.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact } from 'src/app/models/contractor.model';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { DialogListContractorComponent } from 'src/app/components/shared/dialog/dialog-list-contractor/dialog-list-contractor.component';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  msg: string = "";
  isError: boolean = false;

  selected: string = "";
  disabled: boolean = true;
  
  contact: Contact = {
    id_contractor: null,//this.data.id_contractor,
    name_contractor: '',
    contact: '',
    cel_phone: '',
    email: '',
  }

  mask: string = '';
  maxlength_input_tel: string = '';

  @ViewChild('formCreateContact') formCreate!: NgForm;
  @ViewChild('contractorSelect') contractor!: ElementRef;
  
  constructor(private cardService: CardService, private router: Router, private authGuardService: AuthGuardService, 
    private authService: AuthService, private dialog: MatDialog, private contractorService: ContractorService, 
    private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Cadastrar Contato',
      icon: 'contact_page',
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);  
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
    if(this.contractorService.origin.pageOrigin){
      this.contractorService.origin.pageOrigin = false;
      this.disabled = false;
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

  public openListSelect(): void {
    const dialogRef = this.dialog.open(DialogListContractorComponent, {
      //data: {name: user.name, email: user.email, level: user. allowable_level}
    })
    dialogRef.afterClosed().subscribe( (res: any) => {
      try{
        this.contact.id_contractor = res.id;
        this.contact.name_contractor = this.contractor.nativeElement.value = res.name;
        this.selected = "selected";
      }catch(error){
        if(error){
          this.contact.name_contractor = "";
        }
      }
      
    })
    this.selected = "";
  }

  public confirm(): void {
    this.contractorService.createContact(this.contact, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.name_contractor?this.msg = res.error.name_contractor.msg:
        res.error.contact?this.msg = res.error.contact.msg:
        res.error.cel_phone?this.msg = res.error.cel_phone.msg:
        res.error.email?this.msg = res.error.email.msg:
        this.msg = res.error.msg;
        this.isError = true;
      }else if (res.success){
        this.msg = res.success.msg;
        this.contact.name_contractor = this.contractor!.nativeElement.value = "";
        this.contact.id_contractor = null
        this.formCreate.resetForm();
     }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

 /* public closeDialog(): void {
    this .dialogRef.close();
    this.cardService.subtitle.text = 'Cadastrar Empreiteiro';
    this.cardService.subtitle.icon = 'engineering';
  }*/

  public comeBack (): void{
    history.back();
    !this.contractorService.origin.pageOrigin?this.disabled = true:false;
  }

}
