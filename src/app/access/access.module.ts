import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FeatherModule } from 'angular-feather';
import { AccessLayout2Module } from './layouts/access-layout-2/access-layout-2-module';

@NgModule({
  declarations: [
    AccessComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    FeatherModule,
    AccessRoutingModule,
    AccessLayout2Module
  ],
})
export class AccessModule { }
