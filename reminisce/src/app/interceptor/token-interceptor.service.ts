import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { ReminisceService } from '../services/reminisce.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private sv: ReminisceService) { }

  intercept(req:any,next:any){
    let transformedReq = req.clone({
      setHeaders:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.sv.getToken()}`
      }
    })
    return next.handle(transformedReq)
  }
}
