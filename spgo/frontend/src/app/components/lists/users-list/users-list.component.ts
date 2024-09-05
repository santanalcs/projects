import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY } from 'rxjs';


import { User } from 'src/app/models/user.model';
import { UserService } from '../../views/user/user.service';
import { CardService } from '../../templates/card.service';
import { ConfirmComponent } from '../../shared/dialog/confirm/confirm.component';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { Router } from '@angular/router';
import { AuthService } from '../../views/user/auth.service';
import { DialogEditComponent } from '../../views/user/registration/dialog-edit/dialog-edit.component';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { FilterService } from '../../templates/filter.service';
import { PaginatorService } from '../../templates/paginator.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  displayedColumns = ['id', 'name', 'email', 'level', 'actions'];
  dataSource:User [] = [];

  users: any = [];

  //pageSize: number = 0;
  //qtdPage: number = 0;
  currentPage: number = 0;
  totalSize: number = 0;
  sizeOptions: any = [5, 10, 15];

  searchField: string = "Filtrar por Nome";

  msg: string = "";
  disabled: boolean = true;
  addHidden: boolean = false;
  dataEdition: any = {
    name: '',
    level: 0,
  }

  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator | undefined;

  constructor(private userService: UserService, private cardService: CardService, private router: Router, 
    private authService: AuthService, private authGuardService: AuthGuardService, private dialog: MatDialog,
    private filterService: FilterService, private paginatorService: PaginatorService, private snackBar:SnackBarService) {
    cardService.subtitle = {
      text: 'Lista de Usuários',
      icon: 'group',
    }

    paginatorService.paginator = {
      pageSize: 0,
    }
  }
  
  ngOnInit(): void {
    this.getAll();
    this.userService.index().subscribe(res => {
      this.totalSize = res.users.length;
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
  //this.pageSize = event;
    this.paginatorService.paginator.pageSize = event;  
    this.paginate(this.currentPage);
  }
  public paginate(event: any) {
    this.currentPage = event;
    //const end = (event + 1) * this.pageSize;
    //const start = event * this.pageSize;
    //const dataPage = this.users.slice(start, end);
    //this.dataSource = dataPage;
    this.dataSource = this.paginatorService.iterator(event, this.users);
  }

  public pageOrigin(){
    this.router.navigate(['/usuario/cadastrar']);
    this.userService.origin.pageOrigin = true;
  }

  public search(event: string){
    if(event == ''){
      this.users = [];
      this.getAll();
      this.currentPage = 0;
      return
    }
    /*let filter:any = [];
    filter = this.filterService.filterName(this.users, event)
    console.log(filter)
    filter = () => {
      return this.users.filter((data: User) => data.name.toLowerCase().indexOf(event.toLowerCase()) > -1);
    }*/
    this.users = this.filterService.filterName(this.users, event);
    this.totalSize = this.users.length;
    this.currentPage = 0;
    this.paginate(this.currentPage);
  }

  public getAll() {
    this.userService.index().subscribe(res => {
      for(let i = 0; i < res.users.length; i++) {
        this.users.push({
          id: res.users[i].id,
          name: res.users[i].name,
          email: res.users[i].email,
          level: res.users[i].allowable_level,
        })
      }
      /*if(this.pageSize == 0){
        this.pageSize = this.sizeOptions[0];
        this.totalSize = this.users.length;
      }*/
      if(this.paginatorService.paginator.pageSize == 0){
        this.paginatorService.paginator.pageSize = this.sizeOptions[0];
        this.totalSize = this.users.length;
      }
      this.totalSize = res.users.length;
      this.paginate(this.currentPage);
    }) 
  }

  public confirmDelete(user: any): void {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data: {msg:`Confirma exluir registro! #Id:${user.id}`},
    }) 
    dialogRef.afterClosed().subscribe( (res: boolean) => {
      if(res) {
        this.userService.deleteUser(user.id).subscribe((res) => {
          this.msg = res.success.msg;
          this.users = [];
          this.getAll();
          this.snackBar.showMessage(this.msg, false);
        })
      }
        //console .log( 'Cofirma ' + res);
    }) 
 }

  public updatesLevel(user: any): void {
    let error: boolean
    const dialogRef = this.dialog.open(DialogEditComponent,{
      //data: {name: user.name, email: user.email, level: user. allowable_level}
    })
    dialogRef.componentInstance.data = {
      id: user.id,
      name: user.name, 
      email: user.email, 
      level: user.level,
    } 
    dialogRef.afterClosed().subscribe( (res: any) => {
      if(res){
        this.dataEdition = {id: res.id, name: res.name, level: res.level};
        this.userService.editAllowableLevel(this.dataEdition).subscribe((res) => {
          res.error?this.msg = res.error.level.msg:error=false;
          res.success?this.msg = res.success.msg:error=true;
          this.users = [];
          this.getAll();
          this.snackBar.showMessage(this.msg, error);
        }) 
      }
      this.cardService.subtitle.text = 'Lista de Usuários';
      this.cardService.subtitle.icon = 'group'; 
    })      
  }
}

