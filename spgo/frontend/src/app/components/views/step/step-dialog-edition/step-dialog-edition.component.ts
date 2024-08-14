import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { Step } from 'src/app/models/step.model';
import { StepService } from '../step.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';

@Component({
  selector: 'app-step-dialog-edition',
  templateUrl: './step-dialog-edition.component.html',
  styleUrls: ['./step-dialog-edition.component.css']
})
export class StepDialogEditionComponent {
isError: boolean = false;

  msg: string = "";

  step: Step = {
    id: 0,
    step: '',
  }

  constructor(public dialogRef: MatDialogRef<StepDialogEditionComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private stepService: StepService, private authGuardService: AuthGuardService, private authService: AuthService, 
  private snackBar:SnackBarService, private cardService: CardService, private dialog: MatDialog){
    cardService.titleDialog = {
      text_dialog: 'Atualizar dados da Etapa',
      icon: 'tab',
    }
  }

  ngOnInit(): void {
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
  }

  public confirm(res: Step): void {
    if(res){
      this.step = {id: res.id, step: res.step};
      this.stepService.editStep(this.step, this.authGuardService.guard.token).subscribe((res) => {
        if(res.error){
          res.error.step?this.msg=res.error.step.msg:
          this.msg = res.error.msg;
          this.isError = true;
        } else if (res.success) {
            this.msg = res.success.msg;
            this .dialogRef.close(res);
        }
        this.snackBar.showMessage(this.msg, this.isError);
      }) 
    }
  }

  public closeDialog(): void {
    this .dialogRef.close();
  }

}
