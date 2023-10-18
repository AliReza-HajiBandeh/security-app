import { NgModule } from '@angular/core';
import { RouteData } from '@js-sugar/angular';
import { AccessComponent } from './access.component';
import { Routes, RouterModule } from '@angular/router';
import {AccessGuard} from "./access.guard";

const routes: Routes = [
  {
    path: '',
    component: AccessComponent,
    canActivate: [AccessGuard],
    data: {
      title: 'ناحیه ورود'
    } as RouteData,
    children: [
      {
        path: 'signin',
        loadChildren: () => import('./signin/signin.module').then(x => x.SigninModule),
      },
      {
        path: 'force-change-password',
        loadChildren: () => import('./force-change-password/force-change-password.module').then(x => x.ForceChangePasswordModule)
      },
      {
        path: 'forget-password',
        loadChildren: () => import('./forget-password/forget-password.module').then(x => x.ForgetPasswordModule),
      },
      {
        path: 'change-password',
        loadChildren: () => import('./change-password/change-password.module').then(x => x.ChangePasswordModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
