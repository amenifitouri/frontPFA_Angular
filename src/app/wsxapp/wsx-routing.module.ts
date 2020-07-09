import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WebserviceComponent} from './webservice/webservice.component';
import {AuthGuard} from '../shared/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'webservice',
        component: WebserviceComponent,
        data: {
          title: 'Webservice'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class wsxRoutingModule { }
