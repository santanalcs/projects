import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AddUser, User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _add = new BehaviorSubject<AddUser>({
    pageOrigin: false,
  })
  
  constructor(private http: HttpClient) { };

  private apiUrl = environment.API;

  public get origin():AddUser {
    return this._add.value;
  }

  public set origin(value:AddUser) {
    this._add.next(value);
  }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/usuarios`);
  }

  public create(user: User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/usuario`, user);
  }

  public editAllowableLevel(data: any):Observable<User>{
    let body = {
      level: parseInt(data.level)
    }
    return this.http.patch<User>(`${this.apiUrl}/usuario/${data.id}`, body);
  }

  public deleteUser(id: string):Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}/usuario/${id}`);
  }
}
