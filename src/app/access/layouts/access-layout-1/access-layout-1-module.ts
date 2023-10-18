import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessLayout1Component } from './access-layout-1.component';
import { FeatherModule } from 'angular-feather';

@NgModule({
  declarations: [
    AccessLayout1Component
  ],
  imports: [
    CommonModule,
    FeatherModule
  ],
  exports: [
    AccessLayout1Component
  ]
})
export class AccessLayout1Module { }
