import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JalaaliPipe } from './jalaali.pipe';



@NgModule({
  declarations: [
    JalaaliPipe
  ],
  exports: [
    JalaaliPipe
  ],
  imports: [
    CommonModule
  ]
})
export class DateModule { }
