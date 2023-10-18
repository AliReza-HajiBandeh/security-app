import { Component, OnInit } from '@angular/core';
import { UserIdentityStore } from '@rbcorp/ui-infra';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { AppUserIdentity } from './common/security';
import { SecurityService } from './common/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private readonly nzConfigService: NzConfigService
  ) {
    if (this.securityService.isUserAuthenticated()) {
      this.identityStore.set(this.securityService.getUserIdentity());
    }
  }

  ngOnInit(): void {
    this.nzConfigService.set('notification', { nzDirection: 'rtl' });
  }
}
