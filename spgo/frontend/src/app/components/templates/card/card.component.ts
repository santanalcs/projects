import { Component } from '@angular/core';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  constructor(private cardService: CardService) {}

  public get text(): string {
    return this.cardService.subtitle.text;
  }

  public get icon(): string {
    return this.cardService.subtitle.icon;
  }
}
