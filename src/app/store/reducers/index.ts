import * as fromGame from './game.reducers';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface State {
  game: fromGame.State;
}

export const reducers: ActionReducerMap<State> = {
  game: fromGame.reducer
};

export const getGameState = createFeatureSelector<fromGame.State>('game');
