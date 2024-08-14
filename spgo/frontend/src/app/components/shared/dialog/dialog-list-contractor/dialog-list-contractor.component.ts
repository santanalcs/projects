import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterService } from 'src/app/components/templates/filter.service';
import { ContractorService } from 'src/app/components/views/contractor/contractor.service';
import { Contractor } from 'src/app/models/contractor.model';

@Component({
  selector: 'app-dialog-list-contractor',
  templateUrl: './dialog-list-contractor.component.html',
  styleUrls: ['./dialog-list-contractor.component.css']
})
export class DialogListContractorComponent {
  displayedColumns = ['id', 'name', 'cpf-cnpj', 'actions'];
  dataSource:Contractor [] = [];

  contractores: any = [];

  searchField: string = "Filtrar por nome";
  addHidden: boolean = true;

  constructor(private contractorService:ContractorService, public dialogRef: MatDialogRef<DialogListContractorComponent>, 
    @Inject (MAT_DIALOG_DATA) public data: any, private filterService: FilterService) {
  }

  ngOnInit(): void {
    this.getAll();
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
      this.dataSource = this.contractores;
    })
  }

  public search(event: string){
    if(event == ''){
      this.contractores = [];
      this.getAll();
      return
    }
    this.contractores = this.filterService.filterName(this.contractores, event);
    this.dataSource = this.contractores;
  }

  public closeDialog(res: Contractor): void {
    this .dialogRef.close(res);
  }

}
