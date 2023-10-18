import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MngComponent} from './mng.component';
import {RouterModule} from "@angular/router";
import {PagesModule} from "../pages.module";
import {DataService} from "../../../common/data.service";
import {FormModule} from "../form/form.module";
import {TableModule} from "../table/table.module";

@NgModule({
  declarations: [
    MngComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: '', data: {title: 'مدیریت'}, component: MngComponent},
            {path: 'crud/:id', loadChildren: () => import('../crud/crud.module').then(x => x.CrudModule)},
        ]),
        PagesModule,
        FormModule,
        TableModule,
    ],
  providers: [DataService]

})
export class MngModule {
}
