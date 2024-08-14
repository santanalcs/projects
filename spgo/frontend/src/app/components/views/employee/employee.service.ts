import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AddEmployee, EditEmployee, Employee } from 'src/app/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _add = new BehaviorSubject<AddEmployee>({
    pageOrigin: false,
  })

  /*private _edit = new BehaviorSubject<EditEmployee>({
    cpf: '',
    cel_phone: '',
  })*/

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public get origin():AddEmployee {
    return this._add.value;
  }

  public set origin(value:AddEmployee) {
    this._add.next(value);
  }

  /*public get editEployee():EditEmployee {
    return this._edit.value;
  }

  public set  editEployee(value:EditEmployee) {
    this._edit.next(value);
  }*/

  public create(employee: Employee, token: string):Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}/colaborador/?token=${token}`, employee);
  }

  public editEmployee(data: any, token: string):Observable<Employee>{
    let body = {
      name: data.name,
      cpf: data.cpf,
      cel_phone: data.cel_phone
    }
    return this.http.patch<Employee>(`${this.apiUrl}/colaborador/?id=${data.id}&token=${token}`, body);
  }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/colaboradores`);
  }
}
