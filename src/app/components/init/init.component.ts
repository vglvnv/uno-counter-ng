import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../store';
import { Player } from '../../models/player';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  // TODO: Реализовать удаление пользователей
  // TODO: При переходе дальше по роутеру отправлять актуальное состояние needToWin
  @ViewChild('needPointsToWinInput') input: ElementRef;
  needToWin$: Observable<number>;
  players$: Observable<Player[]>;
  readyToPlay$: Observable<boolean>;
  addPlayer(playerName: string) {
    if (!playerName) {
      return;
    }
    this.store.dispatch(new fromRoot.CreatePlayer(playerName));
  }
  constructor(private store: Store<fromRoot.State>) {
    this.needToWin$ = store.select(fromRoot.getNeedPointsToWin);
    this.players$ = store.select(fromRoot.getPlayers);
    this.readyToPlay$ = store.select(fromRoot.isReadyToPlay);
  }
  ngOnInit() {
    fromEvent<Event>(this.input.nativeElement, 'change')
      .pipe(
        map(ev => +(<HTMLInputElement>(ev.target)).value),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(val => {
        this.store.dispatch(new fromRoot.SetNeedToWin(val));
      });
  }
}
