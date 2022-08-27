import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ReminisceService } from './services/reminisce.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private sv: ReminisceService,
    private router: Router){}

    canActivate(): boolean {
      if(this.sv.loggedIn()){
        return true;
      }
      else{
        this.router.navigate(['/login']);
        return false;
      }
    }
  
}
