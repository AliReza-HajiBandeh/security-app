import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../../common/security/security.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'rbc-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  model = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  }
  constructor(private service: SecurityService, private notification: NzNotificationService) { }

  ngOnInit(): void {
  }

  submit() {
    this.service.changePassword({currentPassword: this.model.currentPassword, newPassword: this.model.newPassword}).subscribe(res => {
      this.model = {currentPassword: '', newPassword: '', confirmNewPassword: ''}
      this.notification.success('تغییر رمز عبور', 'رمز عبور با موفقیت تغییر یافت!')
    })
  }
}
