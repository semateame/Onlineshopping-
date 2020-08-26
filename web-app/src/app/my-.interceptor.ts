import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyService } from './my.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

token
  constructor(private info:MyService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem('token')
    const authreq = request.clone({ headers: request.headers.set('authorization',`Bearer ${this.token}`) })

    return next.handle(authreq);
    
  } 
}
