import { Component, ViewChild } from '@angular/core';
import { CardService } from '../../templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { leadingComment } from '@angular/compiler';
import { Employee } from 'src/app/models/employee.model';
import { EMPTY } from 'rxjs';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  employee: Employee = {
    name: '',
    cpf: '',
    cel_phone: '',
  }
  person = 'física';
  mask: string = '';
  maxlength_input_cpf: string = '';
  maxlength_input_tel: string = '';

  @ViewChild('formEmployee') formEmployee!: NgForm;


  constructor(private cardService: CardService, private authGuardService: AuthGuardService, 
    private router: Router, private authService: AuthService, private employeeService: EmployeeService,
    private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Cadastrar Colaborador',
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
    if(this.employeeService.origin.pageOrigin){
      this.employeeService.origin.pageOrigin = false;
      this.disabled = false;
    }

    //console.log(this.allowable_level)
  }

  public get allowable_level(): number {
    return this.authGuardService.guard.allowable_level
  }

  public maskCpfCnpj():void{ 
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
  }

  public create():void{
    this.employeeService.create(this.employee, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.name?this.msg = res.error.name.msg:
        res.error.cpf?this.msg = res.error.cpf.msg:
        res.error.cel_phone?this.msg = res.error.cel_phone.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if(res.success){
          this.msg = res.success.msg;
          this.formEmployee.resetForm();
          //this.selected = "";
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public comeBack (): void{
    history.back();
    !this.employeeService.origin.pageOrigin?this.disabled = true:false;
  }
}
