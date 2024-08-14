import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contractor } from 'src/app/models/contractor.model';
import { ContractorService } from '../contractor.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-contractor-dialog-edit',
  templateUrl: './contractor-dialog-edit.component.html',
  styleUrls: ['./contractor-dialog-edit.component.css']
})
export class ContractorDialogEditComponent {
  msg: string = "";
  isError: boolean = false;

  contractor: Contractor = {
    id: this.data.id,
    name: this.data.name,
    type_person: this.data.type_person,
    cpf_cnpj: this.data.cpf_cnpj,
  }

  constructor(public dialogRef: MatDialogRef<ContractorDialogEditComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private contractorService: ContractorService, private snackBar:SnackBarService, private cardService: CardService,
  private authGuardService: AuthGuardService, private authService: AuthService, ){
    cardService.subtitle = {
      text: `Atualizar Empreiteiro`,
      icon: 'engineering',
    }
  }
  public confirm(): void{
    this.contractorService.editContractor(this.contractor, this.authGuardService.guard.token).subscribe((res) => {
      if(res.error){
        res.error.name?this.msg = res.error.name.msg:
        res.error.cpf_cnpj?this.msg = res.error.cpf_cnpj.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
        this.msg = res.success.msg
        this.isError = false;
        this.dialogRef.close(res);
      }
      this.snackBar.showMessage(this.msg, this.isError);
    })
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
