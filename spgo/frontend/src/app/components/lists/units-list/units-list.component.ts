import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Measure } from 'src/app/models/measures-unit.model';
import { MeasuresUnitService } from '../../views/supply/measures-unit.service';
import { CardService } from '../../templates/card.service';
import { AuthService } from '../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { FilterService } from '../../templates/filter.service';
import { PaginatorService } from '../../templates/paginator.service';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css']
})
export class UnitsListComponent {
  displayedColumns = ['id', 'symbol', 'description', 'group'];
  dataSource:Measure [] = [];

  units: any = [];

  pageSize: number = 0;
  qtdPage: number = 0;
  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por Descrição";

  msg: string = "";

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator | undefined;

  constructor(private unitService: MeasuresUnitService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Lista de Unidades de Medidas',
      icon: 'straighten',
    }
    paginatorService.paginator = {
      pageSize: 0,
    }

    unitService.origin = {
      pageOrigin: false,
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.unitService.index().subscribe(res => {
      this.totalSize = res.units.length;
    })

    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return;
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;     
    })
  }

  public changePageSize(event: any){
    //this.pageSize = event;
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }
  public paginate(event: any) {
    this.currentPage = event;
    //const end = (event + 1) * this.pageSize;
    //const start = event * this.pageSize;
    //const dataPage = this.units.slice(start, end);
    //this.dataSource = dataPage;
    this.dataSource = this.paginatorService.iterator(event, this.units);
  }
  
  public pageOrigin(){
    this.router.navigate(['/unidade/medida/cadastrar']);
    this.unitService.origin.pageOrigin = true;
  }
  
  public search(event: string){
    if(event == ''){
      this.units = [];
      this.getAll();
      this.currentPage = 0;
      //this.paginate(this.currentPage);
      return
    }
    /*let filter:any = [];
    filter = () => {
      return this.units.filter((data: Measure) => data.description.toLowerCase().indexOf(event.toLowerCase()) > -1);
    }*/
    this.units = this.filterService.filterDescription(this.units, event);
    this.totalSize = this.units.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
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
      /*if(this.pageSize == 0){
        this.pageSize = this.sizeOptions[0];
        this.totalSize = this.units.length;
      }*/
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.units.length;
      }
      this.totalSize = res.units.length;
      this.paginate(this.currentPage);
    }) 
  }
}
