import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConstructionService } from 'src/app/components/views/construction/construction.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { ContractorService } from 'src/app/components/views/contractor/contractor.service';

@Injectable({
  providedIn: 'root'
})
export class DialogAddAddressService {
  msg: string = "";
  isError: boolean = false;

  constructor( public dialog: MatDialog, private constructionService: ConstructionService, private contractorService: ContractorService,
    private authGuardService: AuthGuardService, private snackBar:SnackBarService,) { }

  public constructionAddressServices(adress: any): void{
    this.constructionService.createAddress(adress, this.authGuardService.guard.token).subscribe(res => {
      if(res.error){
        res.error.address?this.msg = res.error.address.msg:
        res.error.district?this.msg = res.error.district.msg:
        res.error.zip_code?this.msg = res.error.zip_code.msg:
        res.error.city?this.msg = res.error.city.msg:
        res.error.uf?this.msg = res.error.uf.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
        this.msg = res.success.msg;
        this.dialog.closeAll()
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public contractorAddressServices(address: any): void{
    if(address.action == 'Cadastrar'){
      //console.log(this.authGuardService.guard.token)
      this.contractorService.createAddress(address, this.authGuardService.guard.token).subscribe(res => {
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
          this.isError = false;
          this.dialog.closeAll();
        }
        this.snackBar.showMessage(this.msg, this.isError);
      })
    }
    if(address.action == 'Atualizar'){
      this.contractorService.editAddress(address, this.authGuardService.guard.token).subscribe((res) => {
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
          this.dialog.closeAll();
        }
        this.snackBar.showMessage(this.msg, this.isError);
      })
    }
  }
}
