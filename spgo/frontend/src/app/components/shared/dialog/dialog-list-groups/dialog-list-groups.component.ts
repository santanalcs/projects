import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/models/groups-criterions.model';
import { ListGroupsService } from './list-groups.service';

@Component({
  selector: 'app-dialog-list-groups',
  templateUrl: './dialog-list-groups.component.html',
  styleUrls: ['./dialog-list-groups.component.css']
})
export class DialogListGroupsComponent {
  displayedColumns = ['id', 'description', 'actions'];
  dataSource: Group [] = [];

  groups: any = [ ];

  constructor(public dialogRef: MatDialogRef<DialogListGroupsComponent>, @Inject (MAT_DIALOG_DATA) public data: any,
    private listGroupsService: ListGroupsService){}

  ngOnInit(): void {
    this.getAll();
  }

  public getAll() {
    this.listGroupsService.index().subscribe(res => {
      for(let i = 0; i < res.groups.length; i++) {
        this.groups.push({
          id: res.groups[i].id,
          description: res.groups[i].description,
        })
      }
      this.dataSource = this.groups
    }) 
  }

  public closeDialog(res: Group): void {
    this .dialogRef.close(res);
  }

}
