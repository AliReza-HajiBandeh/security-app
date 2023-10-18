import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FeatherModule } from 'angular-feather';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { SignupComponent } from './signup.component';
import { InputModule, ValidationModule } from '@rbcorp/ui-infra';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RouteData } from '@js-sugar/angular';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
    InputModule,
    ValidationModule,

    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSelectModule,
    RouterModule.forChild([{
      path: '',
      component: SignupComponent,
      data: {
        id: 'signup',
        title: 'ایجاد حساب کاربری'
      } as RouteData
    }])
  ],
})
export class SignupModule { }
