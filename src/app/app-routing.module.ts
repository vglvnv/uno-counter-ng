import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './init/init.component';
import { StatusComponent } from './status/status.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/init', pathMatch: 'full'},
  { path: 'init', component: InitComponent },
  { path: 'status', component: StatusComponent },
  { path: 'add/:id', component: AddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
