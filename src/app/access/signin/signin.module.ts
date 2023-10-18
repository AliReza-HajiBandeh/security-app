import { AccessGuard } from './../access.guard';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteData } from '@js-sugar/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InputModule } from '@rbcorp/ui-infra';
import { FeatherModule } from 'angular-feather';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SigninComponent } from './signin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import {PagesModule} from "../../workspace/components/pages.module";
import {SubsystemModule} from "../../workspace/components/subsystem/subsystem.module";
import {NzSelectModule} from "ng-zorro-antd/select";

@NgModule({
  declarations: [
    SigninComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        FeatherModule,

        NzFormModule,
        NzInputModule,
        InputModule,
        NzButtonModule,
        NzCheckboxModule,
        NzNotificationModule,
        NzToolTipModule,
        RouterModule.forChild([{
            path: '',
            component: SigninComponent,
            // canActivate: [AccessGuard],
            data: {
                id: 'signin',
                title: 'ورود به ناحیه کاربری',
            } as RouteData,
        }]),
        PagesModule,
        SubsystemModule,
        NzSelectModule
    ],
})
export class SigninModule { }
