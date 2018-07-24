import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { InitComponent } from './init/init.component';
import { AddComponent } from './add/add.component';
import { StatusComponent } from './status/status.component';
import { PlayerBadgeComponent } from './player-badge/player-badge.component';
import { AppRoutingModule } from './app-routing.module';

import { GameService } from './game.service';
import { ModalComponent } from './modal/modal.component';

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
    BrowserModule, FormsModule, AppRoutingModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
