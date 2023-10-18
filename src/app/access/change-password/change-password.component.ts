import {SecurityService} from './../../common/security/security.service';
import {Component, OnInit} from '@angular/core';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ForgetPasswordDto} from '../../common/security/types';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'rbc-change-password',
  templateUrl: './change-password.component.html',
  styles: [`
    .signup {
      margin-top: 1.5rem;
      text-align: center;
    }
    a {
      margin: 0 .3rem;
      display: block;
    }

    .back {
      text-align: center !important;
      padding: 10px 0;
    }
  `]
})
export class ChangePasswordComponent implements OnInit {
  forgetPasswordDto: ForgetPasswordDto = new ForgetPasswordDto()
  repetitionCode = '';
  captcha = {value: '', uniqueId: ''};
  captchaImg: any;
  constructor(
    private service: SecurityService,
    private router: Router, private sanitizer: DomSanitizer,
    private ac: ActivatedRoute,
    private notification: NzNotificationService) {
    this.ac.params.subscribe((_params: Params) => {
      history.state && history.state.userName
        ? (this.forgetPasswordDto.userName = history.state.userName)
        : this.router.navigate(['../forget-password'], {relativeTo: this.ac});
    });
  }

  ngOnInit(): void {
    this.reloadCaptcha();
  }


  onFormSubmit() {
    this.service.forgetPassword(this.forgetPasswordDto, this.captcha).subscribe(data => {
      this.notification.success('پیغام موفقیت', 'در صورت درست بودن نام کاربری، رمز عبور با موفقیت تغییر یافته است، لطفاً وارد شوید');
      this.router.navigate(['../signin'], {relativeTo: this.ac}).then()
    }, error => {
      this.reloadCaptcha();
    })
  }

  reloadCaptcha() {
    this.captcha = {value: '', uniqueId: ''};
    this.service.getCaptcha().subscribe((res) => {
      const text = atob(res?.image);
      this.captcha.uniqueId = res?.uniqueId;
      this.captchaImg = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpg;base64,${text}`
      );
    });
  }
}
