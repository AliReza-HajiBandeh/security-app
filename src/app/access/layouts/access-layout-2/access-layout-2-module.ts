import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessLayout2Component } from './access-layout-2.component';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    AccessLayout2Component
  ],
  imports: [
    CommonModule,
    FeatherModule
  ],
  exports: [
    AccessLayout2Component
  ]
})
export class AccessLayout2Module { }
