import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Player } from '../../models/player';
import { makeSubscribeToSelectorFn } from '../../utils/subscribe-to-selector';

// TODO: Реализовать удаление пользователей
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit, OnDestroy {
  @ViewChild('needPointsToWinInput') input: ElementRef;

  needToWin$: Observable<number>;
  players$: Observable<Player[]>;
  readyToPlay$: Observable<boolean>;

  private ngUnsubscribe$ = new Subject();

  constructor(private store: Store<fromStore.State>) {}

  addPlayer(playerName: string) {
    if (!playerName) {
      return;
    }
    this.store.dispatch(new fromStore.CreatePlayer(playerName));
  }

  ngOnInit() {
    this.subscribeToSelectors();
    this.subscribeToInputEvent();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  private subscribeToSelectors() {
    const subscribeToSelector = makeSubscribeToSelectorFn(this.store, this.ngUnsubscribe$);

    this.needToWin$ = subscribeToSelector(fromStore.getNeedPointsToWin);
    this.players$ = subscribeToSelector(fromStore.getPlayers);
    this.readyToPlay$ = subscribeToSelector(fromStore.isReadyToPlay);
  }

  private subscribeToInputEvent() {
    fromEvent<Event>(this.input.nativeElement, 'change')
      .pipe(
        map(ev => +(<HTMLInputElement>ev.target).value),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(val => {
        this.store.dispatch(new fromStore.SetNeedToWin(val));
      });
  }
}
