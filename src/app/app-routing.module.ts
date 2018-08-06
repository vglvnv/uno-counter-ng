import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitComponent } from './components/init/init.component';
import { StatusComponent } from './components/status/status.component';
import { AddComponent } from './components/add/add.component';

import { AppGuard } from './app-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full'},
  { path: 'init', component: InitComponent, canActivate: [AppGuard] },
  { path: 'status', component: StatusComponent, canActivate: [AppGuard] },
  { path: 'add/:id', component: AddComponent, canActivate: [AppGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  providers: [AppGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
