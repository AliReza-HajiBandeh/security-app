import { VerifyResetPasswordGuard } from './../verify-reset-password/verify-reset-password.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule } from '@angular/forms';
import { FeatherModule } from 'angular-feather';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { InputModule, ValidationModule } from '@rbcorp/ui-infra';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    ValidationModule,
    InputModule,
    RouterModule.forChild([{
      path: '',
      canActivate: [VerifyResetPasswordGuard],
      component: ChangePasswordComponent,
    }])
  ]
})
export class ChangePasswordModule { }
