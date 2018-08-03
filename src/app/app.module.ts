import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { InitComponent } from './components/init/init.component';
import { AddComponent } from './components/add/add.component';
import { StatusComponent } from './components/status/status.component';
import { PlayerBadgeComponent } from './components/player-badge/player-badge.component';
import { ModalComponent } from './components/modal/modal.component';

import { AppRoutingModule } from './app-routing.module';

import { GameService } from './game.service';

import { reducers } from './store/reducers';
import { Effects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    InitComponent,
    AddComponent,
    StatusComponent,
    PlayerBadgeComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([Effects])
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
