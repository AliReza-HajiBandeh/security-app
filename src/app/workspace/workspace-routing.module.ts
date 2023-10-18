import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteData } from '@js-sugar/angular';
import { WorkspaceComponent } from './workspace.component';
import {AuthorizationGuard} from "./workspace.guard";

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    canActivate: [AuthorizationGuard],
    data: {title: 'پیکربندی امنیت'},
    children: [
      {path: 'mng/:type', loadChildren: () => import('./components/mng/mng.module').then(x => x.MngModule)},
      {path: 'profile', data: {title: 'تغییر رمز ورود'}, loadChildren: () => import('./components/profile/profile.module').then(x => x.ProfileModule)},
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
