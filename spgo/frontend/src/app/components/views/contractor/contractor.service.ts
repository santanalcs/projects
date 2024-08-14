import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinct, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AddContractor, Address, Contact, Contractor } from 'src/app/models/contractor.model';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  private _add = new BehaviorSubject<AddContractor>({
    pageOrigin: false,
  })

  constructor(private http: HttpClient) { }

  private apiUrl = environment.API;

  public get origin():AddContractor {
    return this._add.value;
  }

  public set origin(value:AddContractor) {
    this._add.next(value);
  }

  public createContractor(contractor: Contractor, token: string):Observable<Contractor>{
    return this.http.post<Contractor>(`${this.apiUrl}/contratador/?token=${token}`, contractor );
  }

  public indexContractors():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/contratadores`);
  }

  public indexContractor(cpf_cnpj: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/contratador?cpf_cnpj=${cpf_cnpj}`);
  }

  public createContact(contact: Contact, token: string):Observable<Contact>{
    return this.http.post<Contact>(`${this.apiUrl}/contratador/contato?token=${token}`, contact );
  }

  public createAddress(address: Address, token: string):Observable<Address>{
    return this.http.post<Address>(`${this.apiUrl}/contratador/endereco?token=${token}`, address );
  }

  public editContractor(contractor: any, token: string):Observable<Contractor>{
    let body = {
      name: contractor.name,
      type_person: contractor.type_person,
      cpf_cnpj: contractor.cpf_cnpj,
    }
    return this.http.patch<Contractor>(`${this.apiUrl}/contratador?id=${contractor.id}&token=${token}`, body);
  }

  public editContact(contact: any, token: string):Observable<Contact>{
    let body = {
      name_contractor: contact.name_contractor,
      contact: contact.contact,
      cel_phone: contact.cel_phone,
      email: contact.email,
    }
    return this.http.patch<Contact>(`${this.apiUrl}/contratador/contato?id=${contact.id}&token=${token}`, body);
  }

  public editAddress(address: any, token: string):Observable<Address>{
    let body = {
      name_contractor: address.name_contractor,
      address: address.address,
      district: address.district,
      zip_code: address.zip_code,
      city: address.city,
      uf: address.uf,
    }
    return this.http.patch<Address>(`${this.apiUrl}/contratador/endereco?id=${address.id}&token=${token}`, body);
  }

  public deleteContractor(id: string, token: string):Observable<Contractor>{
    return this.http.delete<Contractor>(`${this.apiUrl}/contratador?id=${id}&token=${token}`);
  }

  public deleteContact(id: string, token: string):Observable<Contact>{
    return this.http.delete<Contact>(`${this.apiUrl}/contratador/contato?id=${id}&token=${token}`);
  }

  public deleteAddress(id: string, token: string):Observable<Address>{
    return this.http.delete<Address>(`${this.apiUrl}/contratador/endereco?id=${id}&token=${token}`);
  }
}
