import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { CardService } from 'src/app/components/templates/card.service';
import { AuthService } from '../user/auth.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service'
import { StepService } from './step.service';
import { Step } from 'src/app/models/step.model';


@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  step: Step = {
    step: '',
  }

  @ViewChild('formStep') formStep!: NgForm;

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, 
    private router: Router, private authService: AuthService, private stepService: StepService,
    private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Cadastrar Etapa',
      icon: 'tab',
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
    if(this.stepService.origin.pageOrigin){
      this.stepService.origin.pageOrigin = false;
      this.disabled = false;
    }
  }

  public create():void{
    this.stepService.create(this.step, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.step?this.msg = res.error.step.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if(res.success){
          this.msg = res.success.msg;
          this.formStep.resetForm();
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public comeBack (): void{
    history.back();
    !this.stepService.origin.pageOrigin?this.disabled = true:false;
  }
}
