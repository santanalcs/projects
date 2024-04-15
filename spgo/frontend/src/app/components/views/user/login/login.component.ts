import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from 'src/app/components/templates/card.service';
import { Auth } from 'src/app/models/auth.model';
import { AuthService } from '../auth.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private  msg:string = "";
  
  public auth: Auth = {
    email: '',
    password: '',
    token: '',
    msg: {},
    error: {
      email: {},
      password: {},
    },
    success: {},
  }

  constructor(private cardService: CardService, private authService: AuthService,
    private snackBar:SnackBarService, private authGuardService: AuthGuardService, private router: Router) {
    cardService.subtitle = {
      text: 'Login do Usuário',
      icon: 'key',
    }
    authGuardService.guard = {
      id: 0,
      name: '',
      email: '',
      token: '',
      allowable_level: null
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res != null){
        this.authGuardService.guard.token = res.user.token;
        this.authGuardService.guard.name = res.user.name;
        this.router.navigate(['']);
      }
    })
  }

  public login():void {
    this.authService.login(this.auth).subscribe(res => {
      if(res.error){
        res.error.email?this.msg = res.error.email.msg:
        res.error.password?this.msg = res.error.password.msg:
        this.msg = res.error.msg;
        this.snackBar.showMessage(this.msg, true);
      }
      if(res.token){
        sessionStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      }
    })
  }
}

