import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../employee.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-employee-dialog-edition',
  templateUrl: './employee-dialog-edition.component.html',
  styleUrls: ['./employee-dialog-edition.component.css']
})
export class EmployeeDialogEditionComponent {
  msg: string = "";
  isError: boolean = false;

  person = 'física';
  mask: string = '';
  maxlength_input_cpf: string = '';
  maxlength_input_tel: string = '';

  employee: Employee = {
    id: 0,
    name: this.data.name,
    cpf: this.data.cpf,
    cel_phone: this.data.cel_phone,
  }

  dataEdition: any = {
    cpf: '',
    cel_phone: '',
  }

  constructor(public dialogRef: MatDialogRef<EmployeeDialogEditionComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private authService: AuthService, private authGuardService: AuthGuardService, private cardService: CardService, 
  private snackBar:SnackBarService, private employeeService: EmployeeService, private dialog: MatDialog){
    cardService.subtitle = {
      text: 'Atualizar dados do Colaborador',
      icon: 'badge',
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
  }

  public confirm(res: Employee): void {
    if(res){
      this.dataEdition = {
        id: res.id, 
        name: this.employee.name, 
        cpf: this.employee.cpf, 
        cel_phone: this.employee.cel_phone
      };
      this.employeeService.editEmployee(this.dataEdition, this.authGuardService.guard.token).subscribe((res) => {
        if(res.error){
          res.error.name?this.msg=res.error.name.msg:
          res.error.cpf?this.msg=res.error.cpf.msg:
          res.error.cel_phone?this.msg = res.error.cel_phone.msg:
          this.msg = res.error.msg;
          this.isError = true;
        } else if(res.success) {
            this.msg = res.success.msg;
            this.dialogRef.close(res);
        }
        this.snackBar.showMessage(this.msg, this.isError);
      }) 
    }
  }

  public closeDialog(): void {
    this .dialogRef.close();
    this.cardService.subtitle.text = 'Lista de Colaboradores';
  }

  public maskCpfCnpj(): void{ 
    this.mask = this.person=='física'?'###.###.###-##':'###.###.###/####-##';
    this. maxlength_input_cpf = this.person=='física'?'14':'19';
    let i = this.employee.cpf.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.employee.cpf += text.substring(0, 1);
      i++;
      text = this.mask.substring(i); 
    }
    //this.employeeService.editEployee.cpf = this.employee.cpf
  }

  public maskTel():void{ 
    this.mask = '## #####-####';
    this.maxlength_input_tel = '13'
    let i = this.employee.cel_phone.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.employee.cel_phone += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
    //this.employeeService.editEployee.cel_phone = this.employee.cel_phone
  }

}
