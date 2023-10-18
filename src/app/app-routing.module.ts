import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '' , redirectTo: '/access/signin', pathMatch: 'full'
  },
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then(x => x.AccessModule),
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace/workspace.module').then(x => x.WorkspaceModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
