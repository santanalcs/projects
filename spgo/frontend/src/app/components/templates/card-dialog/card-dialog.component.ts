import { Component } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {
  constructor(private cardService: CardService) {}

  public get text(): string {
      return this.cardService.titleDialog.text_dialog;
  }

  public get icon(): string {
    return this.cardService.titleDialog.icon;
  }

}
