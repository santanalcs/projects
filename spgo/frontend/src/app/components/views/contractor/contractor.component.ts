import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CardService } from 'src/app/components/templates/card.service';
import { Contractor } from 'src/app/models/contractor.model';
import { AuthService } from '../user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { ContractorService } from './contractor.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { ConfirmComponent } from '../../shared/dialog/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee/employee.service';
import { DialogAddContactComponent } from '../../shared/dialog/dialog-add-contact/dialog-add-contact.component';

@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  contractor: Contractor = {
    //id: 0,
    name: '',
    type_person: '',
    cpf_cnpj: '',
  }

  persons: any = [
    {name: 'FÍSICA', value: 'física'},
    {name: 'JURÍDICA', value: 'jurídica'},
  ]

  mask: string = '';
  maxlength_input_cpf_cnpj: string = '';

  @ViewChild('formContractor') formContractor!: NgForm;
  @ViewChild('personsSelect') person!: ElementRef;

  constructor(private cardService: CardService, private authGuardService: AuthGuardService,  
    private router: Router, private authService: AuthService, private contractorService: ContractorService, 
    private snackBar:SnackBarService, private dialog: MatDialog){

    cardService.subtitle = {
      text: 'Cadastrar Empreiteiro',
      icon: 'engineering',
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

  public onChangePerson(event: any) {
    this.contractor.type_person = event.target.value;
    this.contractor.cpf_cnpj!=null?this.contractor.cpf_cnpj='':null;
  }

  public maskCpfCnpj():void{ 
    this.mask = this.contractor.type_person=='física'?'###.###.###-##':'##.###.###/####-##';
    this.maxlength_input_cpf_cnpj = this.contractor.type_person=='física'?'14':'18';
    let i = this.contractor.cpf_cnpj.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.contractor.cpf_cnpj += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public confirm(contractor: Contractor): void {
    this.contractorService.createContractor(this.contractor, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.name?this.msg = res.error.name.msg:
        res.error.type_person?this.msg = res.error.type_person.msg:
        res.error.cpf_cnpj?this.msg = res.error.cpf_cnpj.msg:
        this.msg = res.error.msg;
        this.isError = true;
      }else if (res.success){
      this.msg = res.success.msg;
      //this .dialogRef.close(res);
      //this.selected = "";
      //console.log(contractor)
      this.contractorService.indexContractor(this.contractor.cpf_cnpj).subscribe(res => {
        this.contractor.id = res.contractor.id;
      })
        const dialogRef = this.dialog.open(ConfirmComponent,{
          data: {msg:`Incluir contato e endereço para: ${contractor.name.toUpperCase()}`},
        }) 
        dialogRef.afterClosed().subscribe( (res: boolean) => {
          if(res) {
            const dialogRef = this.dialog.open(DialogAddContactComponent,{
              data: {
                entity: "Empreiteiro",
                id_contractor: this.contractor.id,
                //id_contractor: contractor.cpf_cnpj,
                contractor: this.contractor.name.toUpperCase(), 
                cpf_cnpj: contractor.cpf_cnpj,
                contact: "",
                cel_phone: "",
                email: "",
                //atction: 'Cadastrar',
                origin: 'page',
                },
            })
            this.contractor.type_person = this.person!.nativeElement.value = "";
            this.formContractor.resetForm();
          }else {
            this.contractor.type_person = this.person!.nativeElement.value = "";
            this.formContractor.resetForm();
          }
        })
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  /*public create():void{
    this.contractorService.createContractor(this.contractor).subscribe(res => {
      if(res.error){
        res.error.name?this.msg = res.error.name.msg:
        res.error.type_person?this.msg = res.error.type_person.msg:
        res.error.cpf_cnpj?this.msg = res.error.cpf_cnpj.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
          this.msg = res.success.msg;
          this.formContractor.resetForm();
          //this.selected = "";
          this.contractor.type_person = this.person!.nativeElement.value = "";
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }*/

  public comeBack (): void{
    history.back();
    !this.contractorService.origin.pageOrigin?this.disabled = true:false;
  }
}
