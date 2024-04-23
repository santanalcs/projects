import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListGroupsService {
  private apiUrl = environment.API;
  constructor(private http: HttpClient) { }

  public index():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/unidade/criterios`);
  }
}
