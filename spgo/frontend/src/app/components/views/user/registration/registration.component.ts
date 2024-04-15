import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  private  msg: string = "";
  private isError: boolean = false;
   
  public user: User = {
    name: '',
    email: '',
    password1: '',
    password2: '',
    error: {},
    success: {},
  }

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, 
    private router: Router, private authService: AuthService, private userService: UserService,
    private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Cadastro do Usuário',
      icon: 'perm_identity',
    }
  }

  @ViewChild('formRegistration') formRegistration!: NgForm;

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res != null){
        this.authGuardService.guard.token = res.user.token;
        this.authGuardService.guard.name = res.user.name;
      }
    })
  }
  public create():void{
    this.userService.create(this.user).subscribe(res => {
      if(res.error){
        res.error.name?this.msg = res.error.name.msg:
        res.error.email?this.msg = res.error.email.msg:
        res.error.password1?this.msg = res.error.password1.msg:
        res.error.password2?this.msg = res.error.password2.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
          this.msg = res.success.msg;
          this.formRegistration.resetForm();
      }
      this.snackBar.showMessage(this.msg, this.isError);
    })
  }

}
