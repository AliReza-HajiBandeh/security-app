import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../common/security/security.service';
import { SignupDto } from '../../common/security/types';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-access-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {
  agreeWithTerms = false;
  passwordConfirm = '';
  loading = false;

  dto: Partial<SignupDto> = {
    isReal: true
  };

  constructor(
    private service: SecurityService,
    private router: Router,
    private notification: NzNotificationService,

  ) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    this.loading = true;
    this.service.signup(this.dto as SignupDto).subscribe(res => {
      this.notification.success('حساب کاربری ایجاد شد', 'حساب کاربری شما ایجاد شد. لطفا با نام کاربری خود وارد سامانه شوید.');
      this.router.navigateByUrl('access/signin');
    }, err => {
      this.loading = false;
    });
  }
}
