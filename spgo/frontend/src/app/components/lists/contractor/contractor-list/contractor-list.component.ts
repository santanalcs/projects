import { Component } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
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
import { ContractorDialogEditComponent } from 'src/app/components/views/contractor/contractor-dialog-edit/contractor-dialog-edit.component';
import { ConfirmComponent } from 'src/app/components/shared/dialog/confirm/confirm.component';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.css']
})
export class ContractorListComponent {
  displayedColumns = ['id', 'name', 'type-person', 'cpf-cnpj', 'contact', 'address', 'actions'];
  dataSource: Contractor [] = [];

  contractores: any = [];

  ifContact: string = "";
  ifAddress: string = "";

  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por nome";
  
  msg: string = "";
  disabled: boolean = true;
  addHidden: boolean = false;


  constructor(private contractorService:ContractorService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
      cardService.subtitle = {
        text: 'Lista de Empreiteiros',
        icon: 'engineering',
      }
  }

  ngOnInit(): void {
    this.getAll();
      this.contractorService.indexContractors().subscribe(res => {
      this.totalSize = res.contractores.length;
    })
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
      (res.user.allowable_level > 3)?this.disabled=false:EMPTY;      
    })
  }

  public changePageSize(event: any){
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }

  public paginate(event: any) {
    this.currentPage = event;
    this.dataSource = this.paginatorService.iterator(event, this.contractores);
  }

  public pageOrigin(){
    this.router.navigate(['/contratador/cadastrar']);
    this.contractorService.origin.pageOrigin = true;
  }

  public search(event: string){
    if(event == ''){
      this.contractores = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.contractores = this.filterService.filterName(this.contractores, event);
    this.totalSize = this.contractores.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll() {
    this.contractorService.indexContractors().subscribe(res => {
      for(let i = 0; i < res.contractores.length; i++) {
        this.contractores.push({
          id: res.contractores[i].id,
          name: res.contractores[i].name,
          type_person: res.contractores[i].type_person,
          cpf_cnpj: res.contractores[i].cpf_cnpj,
          ifContact: res.contractores[i].contacts.length>0?"check":"close",
          ifAddress: res.contractores[i].addresses.length>0?"check":"close",  
        })
      }
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.contractores.length;
      }
      this.totalSize = res.contractores.length;
      this.paginate(this.currentPage);
      //console.log(res.contractores)
    })
  }

  public updateContractor(contractor: any, ): void {
    const dialogRef = this.dialog.open(ContractorDialogEditComponent,{
      data: {
        id: contractor.id,
        name: contractor.name,
        type_person: contractor.type_person,
        cpf_cnpj: contractor.cpf_cnpj,
      }
    })
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      this.cardService.subtitle.text = 'Lista de Empreiteiros';
      //this.cardService.subtitle.icon = 'engineering';
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      this.contractores = [];
      this.getAll();
    })
  }

  public deleteContractor(contractor: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data: {msg:`Confirma exluir! #Empreiteiro: ${contractor.name}`},
    }) 
    dialogRef.beforeClosed().subscribe( (res: boolean) => {
      if(res) {
        let error: boolean;
        this.contractorService.deleteContractor(contractor.id,this.authGuardService.guard.token).subscribe((res) => {
          res.error?this.msg = res.error.msg:this.msg= res.success.msg;
          error = res.error?true:false
          this.snackBar.showMessage(this.msg, error);
        })
        
      }
    })
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      if(res) {
        setTimeout(() => {
          this.contractores = [];
          this.getAll();
        }, 500)     
      }
    })
  }

}
