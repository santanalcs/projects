import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Feedstock, AddFeedstock, MeasureEdition, RatingEdition } from 'src/app/models/feedstock.model';

@Injectable({
  providedIn: 'root'
})
export class FeedstockService {

  private _add = new BehaviorSubject<AddFeedstock>({
    pageOrigin: false,
  })

  private _measure = new BehaviorSubject<MeasureEdition>({
    idMeasure: 0,
    descriptionMeasure: '',
  })

  private _rating = new BehaviorSubject<RatingEdition>({
    rating: '',
  })

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public get origin():AddFeedstock {
    return this._add.value;
  }

  public set origin(value:AddFeedstock) {
    this._add.next(value);
  }

  public get measure():MeasureEdition {
    return this._measure.value;
  }

  public set measure(value:MeasureEdition) {
    this._measure.next(value);
  }

  public get rating():RatingEdition {
    return this._rating.value;
  }

  public set rating(value:RatingEdition) {
    this._rating.next(value);
  }

  public create(feedstock: Feedstock):Observable<Feedstock>{
    return this.http.post<Feedstock>(`${this.apiUrl}/insumo`, feedstock);
  }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/insumos`);
  }

  public editionFeedstock(data: any):Observable<Feedstock>{
    let body = {
      description: data.description,
      rating: data.rating,
      id_measure_unit: parseInt(data.id_measure_unit)
    }
    return this.http.patch<Feedstock>(`${this.apiUrl}/insumo/${data.id}`, body);
  }
}
