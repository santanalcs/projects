import { Injectable } from '@angular/core';

import { EMPTY, Observable } from 'rxjs';

import { SnackBarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
 
  constructor(private snackBar:SnackBarService) { };

  private msg: string = '';
  private keys:any = [];
  private isError:boolean = false;

  public authHandler(e:any):Observable<any> {
    this.keys = Object.keys(e);
    for (let i = 0; i < this.keys.length; i++) {
      if(this.keys[i] == 'error') {
        this.isError = true;
        this.keys = Object.keys(e.error);
        this.keys[i] == 'email'? this.msg = e.error.email.msg:
        this.keys[i] == 'password'? this.msg = e.error.password.msg:
        this.keys[i] == 'msg'? this.msg = e.error.msg:EMPTY
      break
      } else {
        return EMPTY;
      }
    }
    this.snackBar.showMessage(this.msg, this.isError);
    return EMPTY;
  }
}
