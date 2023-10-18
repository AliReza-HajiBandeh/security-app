import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRUDComponent } from './crud.component';
import {RouterModule} from "@angular/router";
import {NzCardModule} from "ng-zorro-antd/card";
import {PagesModule} from "../pages.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputModule} from "@rbcorp/ui-infra";
import {LookupModule} from "../lookup/lookup.module";
import {DataService} from "../../../common/data.service";
import {FormModule} from "../form/form.module";

@NgModule({
  declarations: [
    CRUDComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    PagesModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', data: {title: 'ایجاد'}, component: CRUDComponent}]),
    InputModule,
    LookupModule,
    FormModule,
  ],
  providers: [DataService]
})
export class CrudModule { }
