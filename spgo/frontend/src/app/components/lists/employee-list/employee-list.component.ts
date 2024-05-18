import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from '../../views/employee/employee.service';
import { CardService } from '../../templates/card.service';
import { Router } from '@angular/router';
import { AuthService } from '../../views/user/auth.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterService } from '../../templates/filter.service';
import { PaginatorService } from '../../templates/paginator.service';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  displayedColumns = ['id', 'name', 'cpf', 'cel_phone', 'actions'];
  dataSource:Employee [] = [];

  employees: any = [];

  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por nome";

  disabled: boolean = true;
  addHidden: boolean = false;

  teste: boolean = false;

  constructor(private employeeService:EmployeeService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
      cardService.subtitle = {
        text: 'Lista de Colaboradores',
        icon: 'engineering',
      }
    }

  ngOnInit(): void {
    this.getAll();
      this.employeeService.index().subscribe(res => {
      this.totalSize = res.employees.length;
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
    this.dataSource = this.paginatorService.iterator(event, this.employees);
  }

  public pageOrigin(){
    this.router.navigate(['/colaborador/cadastrar']);
    this.employeeService.origin.pageOrigin = true;
  }

  public search(event: string){
    if(event == ''){
      this.employees = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    this.employees = this.filterService.filterName(this.employees, event);
    this.totalSize = this.employees.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll() {
    this.employeeService.index().subscribe(res => {
      for(let i = 0; i < res.employees.length; i++) {
        this.employees.push({
          id: res.employees[i].id,
          name: res.employees[i].name,
          cpf: res.employees[i].cpf,
          cel_phone: res.employees[i].cel_phone,
        })
      }
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.employees.length;
      }
      this.totalSize = res.employees.length;
      this.paginate(this.currentPage);
    })
  }

}
