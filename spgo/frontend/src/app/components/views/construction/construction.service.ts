import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, Construction } from 'src/app/models/construction.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public createConstruction(construction: Construction, token: string):Observable<Construction>{
    return this.http.post<Construction>(`${this.apiUrl}/obra/?token=${token}`, construction );
  }

  public indexConstruction(owner_cpf: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/obra?owner_cpf=${owner_cpf}`);
  }

  public createAddress(address: Address, token: string):Observable<Address>{
    return this.http.post<Address>(`${this.apiUrl}/obra/endereco?token=${token}`, address );
  }
}
