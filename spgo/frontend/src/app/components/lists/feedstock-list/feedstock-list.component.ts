import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';

import { Feedstock } from 'src/app/models/feedstock.model';
import { FeedstockService } from '../../views/supply/feedstock.service';
import { CardService } from '../../templates/card.service';
import { Router } from '@angular/router';
import { AuthService } from '../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { FilterService } from '../../templates/filter.service';
import { PaginatorService } from '../../templates/paginator.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { FeedstockDialogEditionComponent } from '../../views/supply/feedstock/feedstock-dialog-edition/feedstock-dialog-edition.component';

@Component({
  selector: 'app-feedstock-list',
  templateUrl: './feedstock-list.component.html',
  styleUrls: ['./feedstock-list.component.css']
})
export class FeedstockListComponent {
  displayedColumns = ['id', 'description', 'rating', 'measure', 'actions'];
  dataSource:Feedstock [] = [];

  feedstocks: any = [];

  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por descrição";

  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;
  addHidden: boolean = false;
  dataEdition: any = {
    name: '',
    level: 0,
  }

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator | undefined;

  constructor(private feedstockService:FeedstockService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Lista de Insumos',
      icon: 'inventory_2',
    }

    paginatorService.paginator = {
      pageSize: 0,
    }
  }

  ngOnInit(): void {
    this.getAll();
      this.feedstockService.index().subscribe(res => {
      this.totalSize = res.feedstocks.length;
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
    this.dataSource = this.paginatorService.iterator(event, this.feedstocks);
  }

  public pageOrigin(){
    this.router.navigate(['/insumo/cadastrar']);
    this.feedstockService.origin.pageOrigin = true;
  }
    
  public search(event: string){
    if(event == ''){
      this.feedstocks = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.feedstocks = this.filterService.filterDescription(this.feedstocks, event);
    this.totalSize = this.feedstocks.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }
  
  public getAll() {
    this.feedstockService.index().subscribe(res => {
      for(let i = 0; i < res.feedstocks.length; i++) {
        this.feedstocks.push({
          id: res.feedstocks[i].id,
          description: res.feedstocks[i].description,
          rating: res.feedstocks[i].rating,
          measure_unit: res.feedstocks[i].measure.description,
          id_measure_unit: res.feedstocks[i].measure.id,
        })
      }
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.feedstocks.length;
      }
      this.totalSize = res.feedstocks.length;
      this.paginate(this.currentPage);
    }) 
  }

  public updatesFeedstock(feedstock: any): void {
    let error: boolean
    const dialogRef = this.dialog.open(FeedstockDialogEditionComponent,{
      //data: {name: user.name, email: user.email, level: user. allowable_level}
    })
    dialogRef.componentInstance.data = {
      id: feedstock.id,
      description: feedstock.description, 
      rating: feedstock.rating, 
      measure_unit: feedstock.measure_unit,
      id_measure_unit: feedstock.id_measure_unit,
    } 
    dialogRef.afterClosed().subscribe( (res: any) => {
      if(res){
        if(this.feedstockService.measure.idMeasure != 0 || this.feedstockService.rating.rating != ''){
          if(this.feedstockService.measure.idMeasure != 0 && this.feedstockService.rating.rating != ''){
            this.dataEdition = {
              id: res.id, description: res.description, rating: this.feedstockService.rating.rating,
              id_measure_unit: this.feedstockService.measure.idMeasure,
            };
          } else if(this.feedstockService.measure.idMeasure != 0 ){
            this.dataEdition = {
              id: res.id, description: res.description, rating: res.rating,
              id_measure_unit: this.feedstockService.measure.idMeasure,
            };
          } else if(this.feedstockService.rating.rating != ''){
            this.dataEdition = {
              id: res.id, description: res.description, rating: this.feedstockService.rating.rating,
              id_measure_unit: res.id_measure_unit,
            };
          }  
        } else {
          this.dataEdition = {
            id: res.id, description: res.description, rating: res.rating,
            id_measure_unit: res.id_measure_unit,
          };
        }
        this.feedstockService.editionFeedstock(this.dataEdition).subscribe((res) => {
          if(res.error){
            res.error.description?this.msg = res.error.description.msg:
            res.error.rating?this.msg = res.error.rating.msg:
            res.error.id_measure_unit?this.msg = res.error.id_measure_unit.msg:
            this.msg = res.error.msg;
            this.isError = true;
          } else if (res.success){
              this.msg = res.success.msg;
              this.isError = false;
          }
          this.feedstocks = [];
          this.getAll();
          this.snackBar.showMessage(this.msg, this.isError);
        })
        this.feedstockService.measure.idMeasure = 0;
        this.feedstockService.rating.rating = '';
      }
      //console.log(this.dataEdition)
      this.cardService.subtitle.text = 'Lista de Insumos';
      this.cardService.subtitle.icon = 'inventory_2'; 
    })      
  }

}
