import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, mergeMap } from 'rxjs/operators';
import { LocalStorageService } from '../../local-storage.service';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';

@Injectable()
export class Effects {
  constructor(private actions$: Actions, private localStorageService: LocalStorageService, private store$: Store<fromReducers.State>) {}
  @Effect()
  saveStore$ = this.actions$.pipe(
    ofType(
      fromActions.SET_NEED_TO_WIN,
      fromActions.CREATE_PLAYER,
      fromActions.REMOVE_PLAYER,
      fromActions.SAVE_STATE,
      fromActions.RESET_SCORE,
      fromActions.RESET_STATE,
      fromActions.ENROLL_STACK,
      fromActions.SELECT_PLAYER
    ),
    withLatestFrom(this.store$),
    mergeMap(([actions, state]) =>
      this.localStorageService
        .setState({
          game: {
            ...state.game,
            isInitialized: false
          }
        })
        .pipe(map(() => new fromActions.Saved()))
    )
  );
  @Effect()
  loadState$ = this.actions$.pipe(
    ofType(fromActions.LOAD_STATE),
    switchMap(() => this.localStorageService.getState().pipe(map(state => new fromActions.FetchState(state && state.game))))
  );
}
