import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { VerifyResetPasswordComponent } from './verify-reset-password.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { VerifyResetPasswordGuard } from './verify-reset-password.guard';
import {PagesModule} from "../../common/pages.module";



@NgModule({
  declarations: [
    VerifyResetPasswordComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        RouterModule.forChild([{
            path: '',
            component: VerifyResetPasswordComponent,
            canActivate: [VerifyResetPasswordGuard]
        }]),
        PagesModule
    ]
})
export class VerifyResetPasswordModule { }
