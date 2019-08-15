import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { InitComponent } from './components/init/init.component';
import { AddComponent } from './components/add/add.component';
import { StatusComponent } from './components/status/status.component';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';
import { ModalComponent } from './components/modal/modal.component';

import { AppRoutingModule } from './app-routing.module';

import { reducers } from './store/reducers';
import { Effects } from './store/effects';
import { FixComponent } from './components/fix/fix.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    InitComponent,
    AddComponent,
    StatusComponent,
    PlayerBadgeComponent,
    ModalComponent,
    FixComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([Effects]),
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
