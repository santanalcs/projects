import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataAuthGuard } from '../models/dataguard.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private _guard = new BehaviorSubject<DataAuthGuard>({
    id: 0,
    name: '',
    email: '',
    token: '',
    allowable_level: null,
  })

  constructor() { };

  get guard():DataAuthGuard {
    return this._guard.value;
  }

  set guard(guard:DataAuthGuard) {
    this._guard.next(guard);
  }
}