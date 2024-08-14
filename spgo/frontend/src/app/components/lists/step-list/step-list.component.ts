import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Step } from 'src/app/models/step.model';
import { StepService } from '../../views/step/step.service';
import { CardService } from '../../templates/card.service';
import { AuthService } from '../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { FilterService } from '../../templates/filter.service';
import { PaginatorService } from '../../templates/paginator.service';
import { MatDialog } from '@angular/material/dialog';
import { StepDialogEditionComponent } from '../../views/step/step-dialog-edition/step-dialog-edition.component';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.css']
})
export class StepListComponent {
  displayedColumns = ['id', 'step', 'actions'];
  dataSource: Step [] = [];

  steps: any = [];

  pageSize: number = 0;
  qtdPage: number = 0;
  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por Etapa";
  addHidden: boolean = false;

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator | undefined;

  constructor(private stepService: StepService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService,  private dialog: MatDialog, 
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Lista de Etapas',
      icon: 'tab',
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.stepService.index().subscribe(res => {
      this.totalSize = res.step.length;
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
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }

  public paginate(event: any) {
    this.currentPage = event;
    this.dataSource = this.paginatorService.iterator(event, this.steps);
  }

  public pageOrigin(){
    this.router.navigate(['/etapa/cadastrar']);
    this.stepService.origin.pageOrigin = true;
  }
  
  public search(event: string){
    if(event == ''){
      this.steps = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.steps = this.filterService.filterStep(this.steps, event);
    this.totalSize = this.steps.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll() {
    this.stepService.index().subscribe(res => {
      for(let i = 0; i < res.step.length; i++) {
        this.steps.push({
          id: res.step[i].id,
          step: res.step[i].step,
        })
      }
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.steps.length;
      }
      this.totalSize = res.step.length;
      this.paginate(this.currentPage);
    }) 
  }

  public updatesStep(step: any): void {
    const dialogRef = this.dialog.open(StepDialogEditionComponent,{
      data: {id: step.id, step: step.step}
    })
    dialogRef.afterClosed().subscribe( () => {
        this.steps = [];
        this.getAll();
    })
  }

}
