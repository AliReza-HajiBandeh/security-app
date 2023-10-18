import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubsystemComponent } from './subsystem.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SubsystemComponent
  ],
  exports: [
    SubsystemComponent
  ],
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule
  ]
})
export class SubsystemModule { }
