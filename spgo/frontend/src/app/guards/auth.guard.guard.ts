import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  ) : Observable<boolean> | boolean =>  {
    if(sessionStorage.getItem('token')) {
      return true;
    } else {
      inject(Router).navigate(['/login'])
    }
    return false;
}
