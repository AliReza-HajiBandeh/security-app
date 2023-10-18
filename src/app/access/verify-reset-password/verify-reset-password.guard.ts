import { SecurityService } from './../../common/security/security.service';
import { CanActivateResult } from './../../common/types';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyResetPasswordGuard implements CanActivate {
  constructor(private securityService: SecurityService , private route: Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateResult {
    return this._canActivate(route , state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CanActivateResult{
    return this._canActivate(route , state);
  }

  private _canActivate(route: ActivatedRouteSnapshot , state: RouterStateSnapshot): CanActivateResult{
    return !this.securityService.hasVerifyResetPassCode ? this.route.createUrlTree(['access' , 'forget-password']) : true;
  }

}
