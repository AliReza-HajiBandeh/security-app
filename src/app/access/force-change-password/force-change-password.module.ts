import { ForceChangePasswordGuard } from './force-change-password.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForceChangePasswordComponent } from './force-change-password.component';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FeatherModule } from 'angular-feather';
import { RouterModule, CanActivate } from '@angular/router';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ValidationModule } from '@rbcorp/ui-infra';
import {NzSelectModule} from "ng-zorro-antd/select";
import {PagesModule} from "../../workspace/components/pages.module";



@NgModule({
  declarations: [ForceChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    FeatherModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    ValidationModule,
    RouterModule.forChild([{
      path: '',
      component: ForceChangePasswordComponent,
    }]),
    NzSelectModule,
    PagesModule
  ]
})
export class ForceChangePasswordModule { }
