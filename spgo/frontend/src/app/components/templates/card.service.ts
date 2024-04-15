import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataCard } from 'src/app/models/datacard.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private _subtitle = new BehaviorSubject<DataCard>({
    text: '',
    icon:'',
  })

  constructor() { }

  public get subtitle():DataCard {
    return this._subtitle.value;
  }

  public set subtitle(text:DataCard) {
    this._subtitle.next(text);
  }
}
