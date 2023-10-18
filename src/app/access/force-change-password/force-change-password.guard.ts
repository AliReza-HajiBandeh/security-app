import { CanActivateResult } from './../../common/types';
import { AppUserIdentity } from './../../common/security/user-identity';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { asObservable, UserIdentityStore } from '@rbcorp/ui-infra';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ForceChangePasswordGuard implements CanActivate , CanActivateChild{
  constructor(
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CanActivateResult {
    return this._canActivate(route, state);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CanActivateResult {
    return this._canActivate(childRoute, state);
  }

  private _canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CanActivateResult {
    const user = asObservable(this.identityStore.get());
    return user.pipe(
      map((identity) => {
        return identity == null ? this.router.createUrlTree(['access' , 'signin']) :
         (identity?.forcePasswordChange) ? true :  this.router.createUrlTree(['workspace']);

        // if(identity == null){
        //   this.router.navigateByUrl('access/signin');
        //   return false;
        // } else {
        //   if (identity?.forcePasswordChange) {
        //     return true;
        //   } else{
        //     this.router.createUrlTree(['workspace' , 'inquiry']);
        //     return false;
        //   }
        // }
      })
    );
  }
}
