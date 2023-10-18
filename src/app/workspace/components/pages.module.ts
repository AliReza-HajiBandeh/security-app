import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {InputModule, ValidationModule} from "@rbcorp/ui-infra";
import {TranslatorPipe} from "../../common/utils/translator.pipe";


const MODULES = [
  CommonModule,
  FormsModule,
  NzFormModule,
  NzTableModule,
  FeatherModule,
  NzInputModule,
  NzCardModule,
  NzLayoutModule,
  NzButtonModule,
  NzCheckboxModule,
  NzFormModule,
  NzTypographyModule,
  NzModalModule,
  NzDividerModule,
  NzPopconfirmModule,
  NzToolTipModule,
  InputModule,
  ReactiveFormsModule,
  ValidationModule,
];

@NgModule({
  declarations: [
    TranslatorPipe,
  ],
  imports: [CommonModule, [...MODULES]],
  exports: [...MODULES, TranslatorPipe],
})
export class PagesModule {}
