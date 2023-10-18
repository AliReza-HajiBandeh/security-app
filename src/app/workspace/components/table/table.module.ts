import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {PagesModule} from "../pages.module";
import {RouterModule} from "@angular/router";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {SecurityModule} from "@rbcorp/ui-infra";



@NgModule({
    declarations: [
        TableComponent
    ],
    exports: [
        TableComponent
    ],
    imports: [
        CommonModule,
        PagesModule,
        RouterModule,
        NzDropDownModule,
        SecurityModule
    ]
})
export class TableModule { }
