import { SecurityService } from './../../common/security/security.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {PasswordDto, Token} from "../../common/security/types";
import {UserIdentityStore} from "@rbcorp/ui-infra";
import {AppUserIdentity} from "../../common/security";

@Component({
  selector: 'app-change-password',
  templateUrl: './force-change-password.component.html',
  styles: [`
  .back{
    text-align: center;
    padding: 10px 0;
  }
  `]
})
export class ForceChangePasswordComponent {
  passwordDto: PasswordDto = new PasswordDto()
  repetitionCode = '';
  constructor(
    private service: SecurityService,
    private router: Router,
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private notification: NzNotificationService,
    private ac: ActivatedRoute) {
    this.ac.params.subscribe((_params: Params) => {
      history.state && history.state.currentPassword
        ? (this.passwordDto.currentPassword = history.state.currentPassword)
        : this.router.navigate(['../signin'], { relativeTo: this.ac });
    });
   }


  onFormSubmit(){
    this.service.forceChangePassword(this.passwordDto).subscribe((data: any) => {
      this.notification.success('پیغام موفقیت', 'رمز عبور با موفقیت تغییر یافت، لطفاً وارد شوید');
      this.router.navigate(['../signin'], { relativeTo: this.ac }).then()
    })
  }
}
