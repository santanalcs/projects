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

  private _titleDialog = new BehaviorSubject<DataCard>({
    text_dialog: '',
    icon:'',
  })

  constructor() { }

  public get subtitle():DataCard {
    return this._subtitle.value;
  }

  public get titleDialog():DataCard {
    return this._titleDialog.value;
  }

  public set subtitle(text:DataCard) {
    this._subtitle.next(text);
  }

  public set titleDialog(text_dialog:DataCard) {
    this._titleDialog.next(text_dialog);
  }
}
