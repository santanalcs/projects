import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStep, Step } from 'src/app/models/step.model';

@Injectable({
  providedIn: 'root'
})
export class StepService {
  private _add = new BehaviorSubject<AddStep>({
    pageOrigin: false,
  })

  private apiUrl = environment.API;

  public get origin(): AddStep {
    return this._add.value;
  }

  public set origin(value: AddStep) {
    this._add.next(value);
  }

  constructor(private http: HttpClient) { }

  public create(step: Step, token: string):Observable<Step>{
    return this.http.post<Step>(`${this.apiUrl}/etapa/?token=${token}`, step);
  }

  public editStep(data: any, token: string):Observable<Step>{
    let body = {
      step: data.step,
    }
    return this.http.patch<Step>(`${this.apiUrl}/etapa/?token=${token}&id=${data.id}`, body);
  }

  public index():Observable<any>{
    return this.http.get<Step>(`${this.apiUrl}/etapas`);
  }

  public getStepe(id: number):Observable<Step>{
    return this.http.get<Step>(`${this.apiUrl}/etapa/${id}`);
  }
}
