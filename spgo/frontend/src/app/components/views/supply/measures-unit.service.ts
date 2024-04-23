import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AddMeasure, Measure } from 'src/app/models/measures-unit.model';


@Injectable({
  providedIn: 'root'
})
export class MeasuresUnitService {

  private _add = new BehaviorSubject<AddMeasure>({
    pageOrigin: false,
  })

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public get origin():AddMeasure {
    return this._add.value;
  }

  public set origin(value:AddMeasure) {
    this._add.next(value);
  }

  public create(measure: Measure):Observable<Measure>{
    return this.http.post<Measure>(`${this.apiUrl}/unidade/medida`, measure);
  }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/unidades/medidas`);
  }

  public deleteMeasureUnit(id: string):Observable<Measure>{
    return this.http.delete<Measure>(`${this.apiUrl}/unidade/medida/${id}`);
  }
}
