import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardService } from 'src/app/components/templates/card.service';
import { Address } from 'src/app/models/contractor.model';
import { ContractorService } from '../../contractor.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../../user/auth.service';

@Component({
  selector: 'app-address-dialog-add',
  templateUrl: './address-dialog-add.component.html',
  styleUrls: ['./address-dialog-add.component.css']
})
export class AddressDialogAddComponent {
  msg: string = "";
  isError: boolean = false;

  disabled = false;

  address: Address = {
    id: 0,
    id_contractor: this.data.id_contractor,
    name_contractor: this.data.contractor,
    address: '',
    district: '',
    zip_code: '',
    city: '',
    uf: '',
  }

  action: string = this.data.address_atction;

  mask: string = '';
  maxlength_input_tel: string = '';

  constructor(public dialogRef: MatDialogRef<AddressDialogAddComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private contractorService: ContractorService, private snackBar:SnackBarService, private cardService: CardService,
  private authGuardService: AuthGuardService, private authService: AuthService, ){
    cardService.subtitle = {
      text: `${this.action} Endreço`,
      icon: 'home',
    }
  }

  ngOnInit(): void {
    this.authService.auth().subscribe(res => {
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //this.authGuardService.guard.allowable_level = res.user.allowable_level;
    })
    if(this.action =='Atualizar'){
      this.address.id = this.data.id_address;
      this.address.address = this.data.address;
      this.address.district = this.data.district;
      this.address.zip_code = this.data.zip_code;
      this.address.city = this.data.city;
      this.address.uf = this.data.uf;
      this.disabled = true;
    }
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

  public confirm(): void{
    if(this.action == 'Cadastrar'){
      //console.log(this.authGuardService.guard.token)
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
          this.dialogRef.close(res);
        }
          this.snackBar.showMessage(this.msg, this.isError);
          this.isError = false;
      })
    }
    if(this.action == 'Atualizar'){
      this.contractorService.editAddress(this.address, this.authGuardService.guard.token).subscribe((res) => {
        if(res.error){
          res.error.address?this.msg = res.error.address.msg:
          res.error.district?this.msg = res.error.district.msg:
          res.error.zip_code?this.msg = res.error.zip_code.msg:
          res.error.city?this.msg = res.error.city.msg:
          res.error.uf?this.msg = res.error.uf.msg:
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
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
