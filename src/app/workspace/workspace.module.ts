import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { RouterModule } from '@angular/router';

import { LayoutModule } from '@js-sugar/angular';
import { FeatherModule } from 'angular-feather';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AppBarComponent } from './partials/app-bar/app-bar.component';
import { AsideMenuComponent } from './partials/aside-menu/aside-menu.component';
import { AsideMeessagesComponent } from './partials/aside-messages/aside-messages.component';
import { PageBarComponent } from './partials/page-bar/page-bar.component';
import { SecurityModule } from '@rbcorp/ui-infra';

@NgModule({
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    CommonModule,
    RouterModule,
    LayoutModule,
    FeatherModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzDropDownModule,
    NzPopoverModule,
    NzBackTopModule,
    NzInputModule,
    NzBadgeModule,
    SecurityModule
  ],
  declarations: [
    WorkspaceComponent,
    AsideMenuComponent,
    AsideMeessagesComponent,
    AppBarComponent,
    PageBarComponent,
  ]
})
export class WorkspaceModule { }
