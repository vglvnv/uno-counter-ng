import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from '../modal/modal.component';
import * as fromStore from '../../store';
import { Player } from '../../models/player';
import { makeSubscribeToSelectorFn } from '../../utils/subscribe-to-selector';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  needToBeInitialize$: Observable<boolean>;
  players$: Observable<Player[]>;
  needToWin$: Observable<number>;
  winner$: Observable<Player>;
  isGameOver$: Observable<boolean>;

  @ViewChild('rematchModal', { static: true }) rematchModal: ModalComponent;
  @ViewChild('newGameModal', { static: true }) newGameModal: ModalComponent;

  private ngUnsubscribe$ = new Subject();

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit() {
    this.subscribeToSelectors();
    this.bindToRedirectToInit();
    this.store.dispatch(new fromStore.ResetSelectedPlayer());
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  getAddLink(player: Player) {
    return ['/add', player.id];
  }

  getFixLink(player: Player) {
    return ['/fix', player.id];
  }

  getWinnerClass(condition: boolean) {
    return condition ? 'table-success' : '';
  }

  rematch(confirmed?: boolean | string) {
    if (confirmed && typeof confirmed === 'string') {
      confirmed = JSON.parse(confirmed);
    }
    if (!confirmed) {
      this.rematchModal.show(true);
      return;
    }
    this.rematchModal.show(false);
    this.store.dispatch(new fromStore.ResetScore());
  }

  newGame(confirmed?: boolean) {
    if (!confirmed) {
      this.newGameModal.show(true);
      return;
    }
    this.newGameModal.show(false);
    this.store.dispatch(new fromStore.ResetState());
    this.router.navigate(['init']);
  }

  private bindToRedirectToInit() {
    this.needToBeInitialize$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(val => {
      if (val) {
        this.router.navigate(['init']);
        return;
      }
    });
  }

  private subscribeToSelectors() {
    const subscribeToSelector = makeSubscribeToSelectorFn(this.store, this.ngUnsubscribe$);

    this.needToBeInitialize$ = subscribeToSelector(fromStore.isNeedToBeInitialized);
    this.players$ = subscribeToSelector(fromStore.getPlayersExtended);
    this.needToWin$ = subscribeToSelector(fromStore.getNeedPointsToWin);
    this.winner$ = subscribeToSelector(fromStore.getWinner);
    this.isGameOver$ = subscribeToSelector(fromStore.isGameOver);
  }
}
