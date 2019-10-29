import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginViewComponent} from "./view-components/login-view/login-view.component";
import {HomeViewComponent} from "./view-components/home-view/home-view.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {AdministrationViewComponent} from "./view-components/administration-view/administration-view.component";
import {AdminGuardService} from "./guards/admin-guard.service";
import {DummyViewComponent} from './view-components/dummy-view/dummy-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: '',
    component: HomeViewComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path: 'dummy',
    component: DummyViewComponent,
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path: 'administration',
    component: AdministrationViewComponent,
    canActivate: [
      AdminGuardService
    ]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
