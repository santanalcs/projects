import { Component } from '@angular/core';
import { Address } from 'src/app/models/contractor.model';
import { ContractorService } from '../../../views/contractor/contractor.service';
import { CardService } from '../../../templates/card.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../../templates/filter.service';
import { PaginatorService } from '../../../templates/paginator.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { EMPTY } from 'rxjs';
import { AddressDialogAddComponent } from 'src/app/components/views/contractor/address/address-dialog-add/address-dialog-add.component';
import { ConfirmComponent } from 'src/app/components/shared/dialog/confirm/confirm.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent {
  displayedColumns = ['contractor', 'address', 'district', 'zip-code','city','uf', 'actions'];
  dataSource: Address [] = [];

  addresses: any = [];
  size: number = 0;

  ifContact: string = "";
  ifAddress: string = "";

  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por empreiteiro";
  
  msg: string = "";
  disabled: boolean = true;
  addHidden: boolean = false;


  constructor(private contractorService:ContractorService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
      cardService.subtitle = {
        text: 'Lista de Endereços',
        icon: 'home',
      }
  }

  ngOnInit(): void {
    this.getAll();
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      //(res.user.allowable_level > 3)?this.disabled=false:EMPTY;      
    })
  }

  public changePageSize(event: any){
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }

  public paginate(event: any) {
    this.currentPage = event;
    this.dataSource = this.paginatorService.iterator(event, this.addresses);
  }

  public pageOrigin(){
    this.router.navigate(['/contratador/endereco/cadastrar']);
    this.contractorService.origin.pageOrigin = true;
  }

  public search(event: string){
    if(event == ''){
      this.addresses = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.addresses = this.filterService.filterContractor(this.addresses, event);
    this.totalSize = this.addresses.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll() {
    this.contractorService.indexContractors().subscribe(res => {
      for(let i = 0; i < res.contractores.length; i++) {
        if(res.contractores[i].addresses.length == 0){
          this.addresses.push({
            id_contractor: res.contractores[i].id,
            contractor: res.contractores[i].name,
            disabled: false,
            disabledEdit: true,
          })
        }
        for(let j = 0; j < res.contractores[i].addresses.length; j++) {
          this.addresses.push({
            id: res.contractores[i].addresses[j].id,
            contractor: res.contractores[i].name,
            address: res.contractores[i].addresses[j].address,
            district: res.contractores[i].addresses[j].district,
            zip_code: res.contractores[i].addresses[j].zip_code,
            city: res.contractores[i].addresses[j].city,
            uf: res.contractores[i].addresses[j].uf,
            disabled: true,
          })
            //console.log(res.contractores[i].contacts)
        }
      }      
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.addresses.length;
      }
      this.totalSize = this.addresses.length;
      this.paginate(this.currentPage);
      //console.log(res.contractores)
    })
    //console.log(this.addresses)
  }

  public addAddress(address: any): void {
    const dialogRef = this.dialog.open(AddressDialogAddComponent,{
      data: {
        id_contractor: address.id_contractor, 
        contractor: address.contractor,
        address_atction: 'Cadastrar',
      }
    })
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      this.cardService.subtitle.text = 'Lista de Endereços';
      this.cardService.subtitle.icon = 'home';
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      this.addresses = [];
      this.getAll();
    })
  }

  public updateAddress(address: any, ): void {
    const dialogRef = this.dialog.open(AddressDialogAddComponent,{
      data: {
        id_address: address.id,
        id_contractor: address.id_contractor, 
        contractor: address.contractor,
        address: address.address,
        district: address.district,
        zip_code: address.zip_code,
        city: address.city,
        uf: address.uf,
        address_atction: 'Atualizar', 
      }
    })
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      this.cardService.subtitle.text = 'Lista de Endereços';
      this.cardService.subtitle.icon = 'home';
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      this.addresses = [];
      this.getAll();
    })
  }

  public deleteAddress(address: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data: `Confirma exluir! #Endereço: ${address.address}`,
    }) 
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      if(res) {
        let error: boolean;
        this.contractorService.deleteAddress(address.id,this.authGuardService.guard.token).subscribe((res) => {
          res.error?this.msg = res.error.msg:this.msg= res.success.msg;
          error = res.error?true:false
          this.snackBar.showMessage(this.msg, error);
        })
        
      }
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      if(res) {
        setTimeout(() => {
          this.addresses = [];
          this.getAll();
        }, 500)     
      }
    })
  }
}
