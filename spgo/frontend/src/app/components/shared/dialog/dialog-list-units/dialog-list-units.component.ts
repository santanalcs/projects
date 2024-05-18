import { Component, Inject } from '@angular/core';
import { DialogListGroupsComponent } from '../dialog-list-groups/dialog-list-groups.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Measure } from 'src/app/models/measures-unit.model';
import { MeasuresUnitService } from 'src/app/components/views/supply/measures-unit.service';
import { FilterService } from 'src/app/components/templates/filter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-list-units',
  templateUrl: './dialog-list-units.component.html',
  styleUrls: ['./dialog-list-units.component.css']
})
export class DialogListUnitsComponent {
  displayedColumns = ['id', 'symbol', 'description', 'actions'];
  dataSource:Measure [] = [];

  units: any = [];

  searchField: string = "Filtrar por Descrição";
  addHidden: boolean = true;

  constructor(private unitService: MeasuresUnitService, public dialogRef: MatDialogRef<DialogListGroupsComponent>, 
    @Inject (MAT_DIALOG_DATA) public data: any,private router: Router, private filterService: FilterService){
      unitService.origin = {
        pageOrigin: false,
      }
    }

  ngOnInit(): void {
    this.getAll();
  }
  
  public getAll() {
    this.unitService.index().subscribe(res => {
      for(let i = 0; i < res.units.length; i++) {
        this.units.push({
          id: res.units[i].id,
          symbol: res.units[i].symbol,
          description: res.units[i].description,
          group: res.units[i].id_group_criterion
        })
      }
      this.dataSource = this.units
    }) 
  }

  public search(event: string){
    if(event == ''){
      this.units = [];
      this.getAll();
      //this.currentPage = 0;
      //this.paginate(this.currentPage);
      return
    }
    /*let filter:any = [];
    filter = () => {
      return this.units.filter((data: Measure) => data.description.toLowerCase().indexOf(event.toLowerCase()) > -1);
    }*/
    this.units = this.filterService.filterDescription(this.units, event);
    //this.totalSize = this.units.length;
    //this.currentPage = 0;
    //this.paginate(this.currentPage);
    this.dataSource = this.units
  }
  
  public closeDialog(res: Measure): void {
    this .dialogRef.close(res);
  }

}
