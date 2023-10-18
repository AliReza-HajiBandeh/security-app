import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FeatherModule } from 'angular-feather';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ResetPasswordComponent } from './reset-password.component';
import { RouteData } from '@js-sugar/angular';

@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,

    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    RouterModule.forChild([{
      path: '',
      component: ResetPasswordComponent,
      data: {
        id: 'reset-password',
      } as RouteData
    }])
  ],
})
export class ResetPasswordModule { }
