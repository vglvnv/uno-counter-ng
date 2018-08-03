import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './components/init/init.component';
import { StatusComponent } from './components/status/status.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full'},
  { path: 'init', component: InitComponent },
  { path: 'status', component: StatusComponent },
  { path: 'add/:id', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
