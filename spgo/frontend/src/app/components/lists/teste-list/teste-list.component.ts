import { Component } from '@angular/core';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../views/user/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teste-list',
  templateUrl: './teste-list.component.html',
  styleUrls: ['./teste-list.component.css']
})
export class TesteListComponent {
  displayedColumns = ['actions', 'id', 'name', 'email', 'level' ];
  dataSource:User [] = [];

  users: any = [];
  filter: any = []
  teste: any = []
  list: Array<any> =[]
  checked: boolean = false

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.userService.index().subscribe(res => {
      for(let i = 0; i < res.users.length; i++) {
        this.users.push({
          id: res.users[i].id,
          name: res.users[i].name,
          email: res.users[i].email,
          level: res.users[i].allowable_level
        })
      }
      this.dataSource = this.users 
    }) 
  }
  public testando(e: any, value: any):void{
    let array
    if(e.checked){
      this.filter.push({
        id: value.id
      })
    } else {
      let indice
      for(let i = 0; i < this.filter.length; i++){
        if(this.filter[i].id == value.id)
          indice = i
      }
    array = this.filter.splice(indice, 1)
    }
    console.log(this.filter)
  }

}
