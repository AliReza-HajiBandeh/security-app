import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../../common/security/security.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-access-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.less'],
})
export class ForgetPasswordComponent implements OnInit {
  userName = '';
  regex: RegExp = new RegExp(/^[a-zA-Z0-9$@-_.]+$/);
  captcha = {value: '', uniqueId: ''};
  captchaImg: any;
  constructor(
    private router: Router,
    private service: SecurityService,
    private ac: ActivatedRoute, private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.reloadCaptcha();
  }

  onFormSubmit(): void {
    this.service.sendSms(this.userName, this.captcha).subscribe((res) => {
      this.service.hasVerifyResetPassCode = true;
      this.router.navigate(['../change-password'], {
        relativeTo: this.ac,
        state: {userName: this.userName},
      }).then();
    }, error => {
      this.reloadCaptcha();
      this.service.hasVerifyResetPassCode = false
    });
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
