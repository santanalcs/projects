import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../views/user/auth.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public arrowRegisters: string = "arrow_right";
  public arrowWorks: string = "arrow_right";
  public arrowLogin: string = "arrow_right";
  public arrowLists: string = "arrow_right";

  public registers: boolean = false;
  public works: boolean = false;
  public login: boolean = false;
  public lists: boolean = false;

  private msg: string = "";
  private isError: boolean = false; 

  constructor(private router: Router, private authService: AuthService, private snackBar:SnackBarService) {}

  public checkRegisters (){
    this.registers = true;
    this.arrowRegisters = "arrow_drop_down";
  }
  public checkLists (){
    this.lists = true;
    this.arrowLists = "arrow_drop_down";
  }
  public checkWorks (){
    this.works = true;
    this.arrowWorks = "arrow_drop_down";    
  }

  public checkLogin (){
    this.login = true;
    this.arrowLogin = "arrow_drop_down";
  }

  public closedRegisters (){
    this.registers = false;
    this.arrowRegisters = "arrow_right";
  }

  public closedLists (){
    this.lists = false;
    this.arrowLists = "arrow_right";
  }

  public closedWorks (){
    this.works = false;
    this.arrowWorks = "arrow_right";    
  }

  public closedLogin (){
    this.login = false;
    this.arrowLogin = "arrow_right";
  } 
  
  public logout(){
    let token: any = sessionStorage.getItem('token')
    if(token == null){
      return;
    }
    this.authService.logout(sessionStorage.getItem('token')).subscribe(res => {
      if(res.error){
        this.msg = res.error.msg;
        this.isError = true;
      } else {
        this.msg = res.success.msg;
        this.isError = false;
      }
      this.snackBar.showMessage(this.msg, this.isError);
    })
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}

