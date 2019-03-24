import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Player } from '../../models/player';
import * as fromRoot from '../../store';
import { makeSubscribeToSelectorFn } from '../../utils/subscribe-to-selector';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  player$: Observable<Player>;
  stack$: Observable<number[]>;
  needToWin$: Observable<number>;
  sum$: Observable<number>;

  private ngUnsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromRoot.State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToSelectors();
    this.selectUser();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

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

  private selectUser() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromRoot.SelectPlayer(userId));
  }

  private subscribeToSelectors() {
    const subscribeToSelector = makeSubscribeToSelectorFn(this.store, this.ngUnsubscribe$);

    this.player$ = subscribeToSelector(fromRoot.getSelectedPlayer);
    this.stack$ = subscribeToSelector(fromRoot.getStack);
    this.sum$ = subscribeToSelector(fromRoot.getStackSum);
    this.needToWin$ = subscribeToSelector(fromRoot.getNeedToWinForSelectedPlayer);
  }
}
