import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEditComponent } from '../../../user/registration/dialog-edit/dialog-edit.component';
import { CardService } from 'src/app/components/templates/card.service';
import { Feedstock } from 'src/app/models/feedstock.model';
import { DialogListUnitsComponent } from 'src/app/components/shared/dialog/dialog-list-units/dialog-list-units.component';
import { FeedstockService } from '../../feedstock.service';

@Component({
  selector: 'app-feedstock-dialog-edition',
  templateUrl: './feedstock-dialog-edition.component.html',
  styleUrls: ['./feedstock-dialog-edition.component.css']
})
export class FeedstockDialogEditionComponent {

  selected: string = "";
  ifDataId: boolean = true;

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

  @ViewChild('measuresUnitSelect') measure!: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject (MAT_DIALOG_DATA) public data: any, 
  private cardService: CardService, private feedstockService: FeedstockService, private dialog: MatDialog){
    cardService.subtitle = {
      text: 'Alterar dados do Insumo',
      icon: 'edit_note',
    }
  }

  public confirm(res: Feedstock): void {
    this .dialogRef.close(res);
  }

  public closeDialog(): void {
    this .dialogRef.close();
  }

  public onChangeRating(event: any) {
    this.feedstockService.rating.rating = event.target.value;
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
      this.feedstockService.measure.idMeasure = res.id;
      this.selected = "selected";
      this.ifDataId = false;
    })
    this.ifDataId = true;
  }

}
