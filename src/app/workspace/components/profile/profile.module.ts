import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {PagesModule} from "../pages.module";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild([{path: '', component: ProfileComponent}])
  ]
})
export class ProfileModule { }
