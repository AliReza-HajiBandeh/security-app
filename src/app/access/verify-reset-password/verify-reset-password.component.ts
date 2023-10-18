import { ResetPassReq } from './types';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SecurityService } from '../../common/security/security.service';

@Component({
  selector: 'app-verify-reset-password',
  templateUrl: './verify-reset-password.component.html',
  styleUrls: ['./verify-reset-password.component.less'],
})
export class VerifyResetPasswordComponent implements OnInit {
  resetPassReq: any = new ResetPassReq();

  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private notification: NzNotificationService,
    private securityService: SecurityService
  ) {
    this.ac.params.subscribe((_params: Params) => {
      history.state && history.state.phoneNumber
        ? (this.resetPassReq.mobileNumber = history.state.phoneNumber)
        : this.router.navigate(['../forget-password'], { relativeTo: this.ac });
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    this.securityService.resetPassword(this.resetPassReq).subscribe((res) => {
      this.notification.success('', 'رمز عبور با موفقیت تغییر یافت.');
      this.router.navigateByUrl('/access/signin');
      this.securityService.hasVerifyResetPassCode = false;
    });
  }
}
