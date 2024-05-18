import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AddEmployee, Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _add = new BehaviorSubject<AddEmployee>({
    pageOrigin: false,
  })

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public get origin():AddEmployee {
    return this._add.value;
  }

  public set origin(value:AddEmployee) {
    this._add.next(value);
  }

  public create(employee: Employee, token: string):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/colaborador/?token=${token}`, employee);
  }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/colaboradores`);
  }
}
