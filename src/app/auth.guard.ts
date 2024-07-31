import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
 export class AuthGuard implements CanActivate
 {
  constructor(private router: Router, private appComponent: AppComponent) {}

  canActivate() {
    if (this.appComponent.isLoggedIn) {
    
      return this.router.navigate(['/dashboard']);
    } else {
      return this.router.navigate(['/login']);
     
    }
  }
 // {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
//   constructor(private router: Router, private appComponent: AppComponent) {}
  
}
