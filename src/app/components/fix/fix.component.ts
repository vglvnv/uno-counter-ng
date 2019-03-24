import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Player } from '../../models/player';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromRoot from '../../store/selectors/game.selectors';
import { makeSubscribeToSelectorFn } from '../../utils/subscribe-to-selector';
import { FormControl } from '@angular/forms';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-fix',
  templateUrl: './fix.component.html',
  styleUrls: ['./fix.component.scss']
})
export class FixComponent implements OnInit, OnDestroy {
  player$: Observable<Player>;
  scoreControl: FormControl = new FormControl();

  private ngUnsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromStore.State>, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.selectUser();
    this.subscribeToSelectors();
    this.patchPlayerScore();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  onSubmit() {
    this.store.dispatch(new fromStore.FixSelectedPlayerScore({ score: this.scoreControl.value }));
    this.router.navigate(['status']);
  }

  private selectUser() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new fromStore.SelectPlayer(userId));
  }

  private subscribeToSelectors() {
    const subscribeToSelector = makeSubscribeToSelectorFn(this.store, this.ngUnsubscribe$);
    this.player$ = subscribeToSelector(fromRoot.getSelectedPlayer);
  }

  private patchPlayerScore() {
    this.player$
      .pipe(
        map(x => x.score),
        take(1)
      )
      .subscribe(score => this.scoreControl.patchValue(score, { emitEvent: false }));
  }
}
