import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppUserIdentity } from '../common/security/user-identity';
import { asObservable } from '../common/utils/rxjs';
import { CanActivateResult } from '../common/types';
import { UserIdentityStore } from '@rbcorp/ui-infra';
import { SecurityService } from '../common/security/security.service';

export interface PermissionDenyEvent {}

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private _accessDenySubject = new Subject<PermissionDenyEvent>();
  accessDeny = this._accessDenySubject.asObservable();

  constructor(
    private service: SecurityService,
    private store: UserIdentityStore<AppUserIdentity>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): CanActivateResult {
    const access = this.service.isUserAuthenticated();
    const user = this.store.get();
    const user$ = user
      ? asObservable(user)
      : (this.store.change as Observable<AppUserIdentity>);

    if (access) {
      return user$.pipe(
        map((item) => {
          return (
            access && (!!item?.vip || !!item?.activeSubsystemId)
          );
        })
      );
    } else {
      return false;
    }
  }
}
