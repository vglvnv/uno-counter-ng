import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import * as fromRoot from '../../store';
import { Player } from '../../models/player';

import { ModalComponent } from '../modal/modal.component';
import { takeUntil } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  @ViewChild('rematchModal') rematchModal: ModalComponent;
  @ViewChild('newGameModal') newGameModal: ModalComponent;

  needToBeInited$: Observable<boolean>;
  players$: Observable<Player[]>;
  needToWin$: Observable<number>;
  winner$: Observable<Player>;
  isGameOver$: Observable<boolean>;

  getAddLink(player: Player) {
    return ['/add', player.id];
  }
  getWinnerClass(condition: boolean) {
     return condition ? 'table-success' : '';
  }
  rematch(confirmed?: boolean|string) {
    if (confirmed && typeof(confirmed) === 'string' ) {
      confirmed = JSON.parse(confirmed);
    }
    if (!confirmed) {
      this.rematchModal.show(true);
      return;
    }
    this.rematchModal.show(false);
    this.store.dispatch(new fromRoot.ResetScore());
  }
  newGame(confirmed?: boolean) {
    if (!confirmed) {
      this.newGameModal.show(true);
      return;
    }
    this.newGameModal.show(false);
    this.store.dispatch(new fromRoot.ResetState());
  }

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {
    this.needToBeInited$ = store.select(fromRoot.isNeedToBeInited);
    this.players$ = store.select(fromRoot.getPlayersExtended);
    this.needToWin$ = store.select(fromRoot.getNeedPointsToWin);
    this.winner$ = store.select(fromRoot.getWinner);
    this.isGameOver$ = store.select(fromRoot.isGameOver);
  }

  ngOnInit() {
    // TODO: ngrx-router и guard для защиты от крвого перехода по пустой ссылке
    this.needToBeInited$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(val => {
      if (val) {
        this.router.navigate(['init']);
        return;
      }
    });
    this.store.dispatch(new fromRoot.ResetSelectedPlayer);
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
