import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyService } from './my.service';

@Injectable({
  providedIn: 'root'
})
export class MyGuard implements CanActivate {
  constructor(private info: MyService) { }
  token
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = localStorage.getItem('token')
      
    if (this.token) {
      return true;
    }
    else {
      return false;
    }
  }

}
