import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../../common/security/security.service';
import { AppUserIdentity } from '../../../common/security/user-identity';
import {async, Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {asObservable, UserIdentityStore} from '@rbcorp/ui-infra';
import {DataService} from "../../../common/data.service";

@Component({
  selector: 'app-workspace-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.less'],
})
export class AppBarComponent {
  @Input() compactView = false;
  @Output() humburgerClick = new EventEmitter();
  @Output() messagesClick = new EventEmitter();
  @Output() settingsClick = new EventEmitter();
  @Output() userClick = new EventEmitter();
  userFullName$: Observable<string>;
  activeSubsystemName: any = '';

  constructor(
    private router: Router,
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private securityService: SecurityService, private service: DataService) {

    const user = this.identityStore.get();
    const user$ = user ? asObservable(user) : (this.identityStore.change as Observable<AppUserIdentity>);
    this.userFullName$ = user$
      .pipe(
        map((i: AppUserIdentity) => i ? (i.real ? `${i.firstName} ${i.lastName}` : `${i.title}`) : '-'),
      );
    this.activeSubsystemName = this.identityStore.get()?.activeSubsystemName ? this.identityStore.get()?.activeSubsystemName : 'همه زیرسامانه ها';
  }


  onToggleSideBar(): void {
  }

  onSignoutClick(): void {
    this.router.navigateByUrl('/access/signin').then(r => {
      this.securityService.signout().subscribe();
    });
  }

  gotToChangePassword() {
    this.router.navigateByUrl('workspace/profile').then(r => {});
  }

  goToHelpPage(): void {
    this.router.navigateByUrl('/help').then(r => {});
  }

  goToUserCrud() {
    if (this.identityStore.get()?.id) {
      this.router.navigateByUrl(`workspace/mng/user/crud/${this.identityStore.get()?.id}`).then(r => {})
    }
  }
}
