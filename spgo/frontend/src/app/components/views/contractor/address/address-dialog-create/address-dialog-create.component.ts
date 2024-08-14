import { Component, Inject } from '@angular/core';
import { ContractorService } from '../../contractor.service';
import { CardService } from 'src/app/components/templates/card.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/models/contractor.model';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../../user/auth.service';


@Component({
  selector: 'app-address-dialog-create',
  templateUrl: './address-dialog-create.component.html',
  styleUrls: ['./address-dialog-create.component.css']
})
export class AddressDialogCreateComponent {
  msg: string = "";
  isError: boolean = false;

address: Address = {
  id_contractor: this.data.id_contractor,
  address: '',
  district: '',
  zip_code: '',
  city: '',
  uf: '',
}

mask: string = '';
maxlength_input_tel: string = '';

constructor(public dialogRef: MatDialogRef<AddressDialogCreateComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService, private contractorkService: ContractorService, private dialog: MatDialog, 
  private contractorService: ContractorService, private snackBar:SnackBarService, private authGuardService: AuthGuardService, 
  private authService: AuthService) {
    cardService.subtitle = {
      text: 'Cadastrar Endereço',
      icon: 'home',
    }
  }

  ngOnInit(): void {
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
  }

  public maskCep():void{ 
    this.mask = '#####-###';
    this.maxlength_input_tel = '9'
    let i = this.address.zip_code.length;
    let output = '#';
    let text = this.mask.substring(i);
    while(text.substring(0, 1) != output && text.length){
      this.address.zip_code += text.substring(0, 1);
      i++;
      text = this.mask.substring(i);  
    }
  }

  public confirm(): void {
    this.contractorService.createAddress(this.address, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.address?this.msg = res.error.address.msg:
        res.error.district?this.msg = res.error.district.msg:
        res.error.zip_code?this.msg = res.error.zip_code.msg:
        res.error.city?this.msg = res.error.city.msg:
        res.error.uf?this.msg = res.error.uf.msg:
        this.msg = res.error.msg;
        this.isError = true;
      }else if (res.success){
        this.msg = res.success.msg;
        this .dialogRef.close(res);
        //console.log(this.address)
          //this.selected = "";
      }
      this.snackBar.showMessage(this.msg, this.isError);
       this.isError = false;
       this.cardService.subtitle.text = 'Cadastrar Empreiteiro';
       this.cardService.subtitle.icon = 'engineering';
    })
  }

  public closeDialog(): void {
    this .dialogRef.close();
    this.cardService.subtitle.text = 'Cadastrar Empreiteiro';
    this.cardService.subtitle.icon = 'engineering';
  }

}
