import {PagesModule} from "../pages.module";
import {FormComponent} from "./form.component";
import {NgModule} from "@angular/core";
import {LookupModule} from "../lookup/lookup.module";
import {RouterModule} from "@angular/router";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TableModule} from "../table/table.module";
import {SubsystemModule} from "../subsystem/subsystem.module";

@NgModule({
  declarations: [
    FormComponent,
  ],
  exports: [
    FormComponent,
  ],
  imports: [
    PagesModule,
    LookupModule,
    RouterModule,
    NzSelectModule,
    TableModule,
    SubsystemModule,
  ]
})
export class FormModule {
}
