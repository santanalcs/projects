import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from 'src/app/components/templates/card.service';
import { AuthGuardService } from 'src/app/guards/authguard.service';
import { AuthService } from '../../user/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogListUnitsComponent } from 'src/app/components/shared/dialog/dialog-list-units/dialog-list-units.component';
import { Feedstock } from 'src/app/models/feedstock.model';
import { FeedstockService } from '../feedstock.service';
import { NgForm } from '@angular/forms';
import { SnackBarService } from 'src/app/snackbar/snackbar.service';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-feedstock',
  templateUrl: './feedstock.component.html',
  styleUrls: ['./feedstock.component.css']
})
export class FeedstockComponent {
  msg: string = "";
  isError: boolean = false;

  disabled: boolean = true;

  //measureUnit: string = "";
  selected: string = "";

  feedstock: Feedstock = {
    description: '',
    rating: '',
    id_measure_unit: null,
    error: {},
    success: {},
  }
  
  ratings: any = [
    {name: 'EQUIPAMENTO', value: 'equipamento'},
    {name: 'MATERIAL', value: 'material'},
    {name: 'SERVIÇO', value: 'serviço'},
  ]

  @ViewChild('formFeedstocks') formFeedstocks!: NgForm;
  @ViewChild('ratingsSelect') rating!: ElementRef;
  @ViewChild('measuresUnitSelect') measure!: ElementRef;

  constructor(private cardService: CardService, private authGuardService: AuthGuardService, 
    private router: Router, private authService: AuthService, private feedstockService: FeedstockService,
    private snackBar:SnackBarService, private dialog: MatDialog) {
    cardService.subtitle = {
      text: "Cadastrar Insumo",
      icon: "inventory_2"
    }
  }

  ngOnInit():void{
    this.authService.auth().subscribe(res => {
      if(res == null){
        this.router.navigate(['/login']);
        return
      }
      this.authGuardService.guard.token = res.user.token;
      this.authGuardService.guard.name = res.user.name;
    })
    if(this.feedstockService.origin.pageOrigin){
      this.feedstockService.origin.pageOrigin = false;
      this.disabled = false;
    }
  }

  public onChangeRating(event: any) {
    this.feedstock.rating = event.target.value;
  }

  public openListSelect(): void {
    const dialogRef = this.dialog.open(DialogListUnitsComponent,{
      //data: {name: user.name, email: user.email, level: user. allowable_level}
    })
    /*dialogRef.componentInstance.data = {
      id: user.id,
    } */
    dialogRef.afterClosed().subscribe( (res: any) => {
      this.feedstock.id_measure_unit = res.id;
      this.feedstock.measure_unit = this.measure.nativeElement.value = res.description;
      this.selected = "selected";
    })
  }

  public create():void{
    this.feedstockService.create(this.feedstock).subscribe(res => {
      if(res.error){
        res.error.description?this.msg = res.error.description.msg:
        res.error.rating?this.msg = res.error.rating.msg:
        res.error.id_measure_unit?this.msg = res.error.id_measure_unit.msg:
        this.msg = res.error.msg;
        this.isError = true;
      } else if (res.success){
          this.msg = res.success.msg;
          this.formFeedstocks.resetForm();
          this.feedstock.id_measure_unit = null;
          this.selected = "";
          this.feedstock.rating = this.rating!.nativeElement.value = "";
          this.feedstock.measure_unit = this.measure!.nativeElement.value = "";
      }
      this.snackBar.showMessage(this.msg, this.isError);
      this.isError = false;
    })
  }

  public comeBack (): void{
    history.back();
    !this.feedstockService.origin.pageOrigin?this.disabled = true:false;
  }
}
