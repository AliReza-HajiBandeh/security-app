import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeatherModule } from 'angular-feather';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ForgetPasswordComponent } from './forget-password.component';
import { RouteData } from '@js-sugar/angular';
import {PagesModule} from "../../workspace/components/pages.module";

@NgModule({
  declarations: [
    ForgetPasswordComponent
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
            component: ForgetPasswordComponent,
            data: {
                id: 'forget-password',
            } as RouteData
        }]),
        PagesModule
    ],
})
export class ForgetPasswordModule { }
