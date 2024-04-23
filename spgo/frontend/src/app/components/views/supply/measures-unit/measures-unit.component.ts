import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { EMPTY } from 'rxjs';

import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';
import { DialogListGroupsComponent } from '../../../shared/dialog/dialog-list-groups/dialog-list-groups.component';
import { MeasuresUnitService } from '../measures-unit.service';
import { Measure } from 'src/app/models/measures-unit.model';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';


@Component({
  selector: 'app-measures-unit',
  templateUrl: './measures-unit.component.html',
  styleUrls: ['./measures-unit.component.css']
})
export class MeasuresUnitComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  groupValue: string = "";
  selected: string = "";

  measure: Measure = {
    symbol: '',
    description: '',
    id_group_criterion: null,
    error: {},
    success: {},
  }

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, 
    private measuresUnitService: MeasuresUnitService, private router: Router, private snackBar:SnackBarService, 
    private authService: AuthService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {
    cardService.subtitle = {
      text: 'Cadastrar Unidades e Medidas',
      icon: 'straighten'
    }
  }

  @ViewChild('formMeasuresUnit') formMeasuresUnit!: NgForm;

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      //this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
    this.measuresUnitService.origin.pageOrigin?this.disabled = false:true;
  }

  public openListSelect(): void {
    const dialogRef = this.dialog.open(DialogListGroupsComponent,{
      //data: {name: user.name, email: user.email, level: user. allowable_level}
    })
    /*dialogRef.componentInstance.data = {
      id: user.id,
    } */
    dialogRef.afterClosed().subscribe( (res: any) => {
      this.measure.id_group_criterion = res.id
      this.groupValue = res.description
      this.selected = "selected"
    })
  }

  cadastrar(){
    //console.log(this.groupId);
  }

  public create():void{
    this.measuresUnitService.create(this.measure).subscribe(res => {
      if(res.error){
        res.error.symbol?this.msg = res.error.symbol.msg:
        res.error.description?this.msg = res.error.description.msg:
        res.error.id_group_criterion?this.msg = res.error.id_group_criterion.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
          this.msg = res.success.msg;
          this.formMeasuresUnit.resetForm();
          this.groupValue= "";
          this.selected = "";
          this.measure.id_group_criterion = null;
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public comeBack (): void{
    history.back()
  }
}
