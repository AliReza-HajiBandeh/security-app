import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupComponent } from './lookup.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {PagesModule} from "../pages.module";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTagModule} from "ng-zorro-antd/tag";
import {FeatherIconsModule} from "../../../feather-icons.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";

@NgModule({
  declarations: [
    LookupComponent
  ],
  exports: [
    LookupComponent
  ],
    imports: [
        CommonModule,
        NzModalModule,
        NzIconModule,
        NzTagModule,
        FeatherIconsModule,
        NzButtonModule,
        NzInputModule,
        PagesModule
    ]
})
export class LookupModule { }
