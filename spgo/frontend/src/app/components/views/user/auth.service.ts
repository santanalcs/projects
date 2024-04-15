import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, ReplaySubject, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ErrorHandlerService } from '../../../snackbar/errorhandler.service';
import { Auth } from 'src/app/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private errorHandler:ErrorHandlerService) { }

  private apiUrl = environment.API;

  public login(auth:Auth):Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/login`, auth)
    /*.pipe(map((obj: any)=>{
      this.errorHandler.authHandler(obj);
    }), catchError((e)=>this.errorHandler.authHandler(e)));*/
  }

  public auth():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/auth/?token=${sessionStorage.getItem('token')}`)
  }

  public logout(token: any):Observable<Auth> {
    return this.http.patch<Auth>(`${this.apiUrl}/logout`, {token: token})
  }
  /*public authentic():void {
    this.auth().subscribe(res => {
      this.aut.subscribe(valor => this.aut = res)
    })
  }*/
  public changePws(data: any):Observable<Auth> {
    return this.http.patch<Auth>(`${this.apiUrl}/login`, data)
  }
}
