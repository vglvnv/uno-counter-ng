import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Player } from '../../models/player';
import * as fromRoot from '../../store';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  player$: Observable<Player>;
  stack$: Observable<number[]>;
  needToWin$: Observable<number>;
  summ$: Observable<number>;

  addToStack(value: number) {
    this.store.dispatch(new fromRoot.AddToStack(value));
  }
  undo() {
    this.store.dispatch(new fromRoot.UndoStack());
  }
  reset() {
    this.store.dispatch(new fromRoot.ResetStack());
  }
  onSubmit() {
    this.store.dispatch(new fromRoot.EnrollStack());
    this.router.navigate(['status']);
  }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromRoot.SelectPlayer(userId));
    // TODO: ngrx-router и guard для защиты от крвого перехода по пустой ссылке
    this.player$.subscribe(player => {
      if (!player) {
        this.router.navigate(['status']);
        return;
      }
    });
  }

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.player$ = store.select(fromRoot.getSelectedPlayer);
    this.stack$ = store.select(fromRoot.getStack);
    this.needToWin$ = store.select(fromRoot.getNeedPointsToWin);
    this.summ$ = store.select(fromRoot.getStackSumm);
  }
}
