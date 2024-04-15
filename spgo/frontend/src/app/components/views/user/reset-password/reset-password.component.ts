import { Component, ElementRef, ViewChild } from '@angular/core';

import { CardService } from 'src/app/components/templates/card.service';
import { UserService } from '../user.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../auth.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  private  msg: string = "";
  private isError: boolean = false;

  public data: any = {
    email: '',
    password1: '',
    password2: ''
  }

  constructor(cardService: CardService, public authGuardService: AuthGuardService, private router: Router, 
    private userService: UserService, private authService: AuthService, private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Redefinir Senha',
      icon: 'lock_reset',
    }
  }

  @ViewChild('emailValue', {static: true}) emailValue!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.authService.auth().subscribe(res => {
      if(res != null){
        this.authGuardService.guard.name = res.user.name;
        this.authGuardService.guard.email = res.user.email;
        this.authGuardService.guard.allowable_level = res.user.allowable_level;
      }
    })
  }

  public get name(): string {
    return this.authGuardService.guard.name;
  }

  public get email(): string {
    return this.authGuardService.guard.email;
  }

  public store(){
    this.data.email = this.emailValue.nativeElement.value;
    this.authService.changePws(this.data).subscribe(res => {
      if(res.error){
        res.error.password1?this.msg = res.error.password1.msg:
        res.error.password2?this.msg = res.error.password2.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
          this.msg = res.success.msg;
          this.router.navigate(['/']);
      }
      this.snackBar.showMessage(this.msg, this.isError);
    })
  }

  ngOnDestroy(): void {  
  }
}
