import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivateResult } from '../common/types';
import { asObservable } from '../common/utils/rxjs';
import { UserIdentityStore } from '@rbcorp/ui-infra';
import { AppUserIdentity } from '../common/security/user-identity';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from '@angular/router';
import { SecurityService } from '../common/security/security.service';

@Injectable({
  providedIn: 'root',
})
export class AccessGuard implements CanActivate, CanActivateChild {
  constructor(
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private service: SecurityService,
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

    if (this.service.isUserAuthenticated()) {
      const user = this.identityStore.get();
      return user ? true : this.service.getUserIdentity().pipe(map(x => true));
    }

    return true;
  }
}
