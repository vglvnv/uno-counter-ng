import { Action } from '@ngrx/store';
import { State } from '../reducers/game.reducers';

export const SET_NEED_TO_WIN = 'SET_NEED_TO_WIN';
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const SELECT_PLAYER = 'SELECT_PLAYER';
export const RESET_STATE = 'RESET_STATE';
export const RESET_SCORE = 'RESET_SCORE';
export const ADD_TO_STACK = 'ADD_TO_STACK';
export const RESET_STACK = 'RESET_STACK';
export const UNDO_STACK = 'UNDO_STACK';
export const ENROLL_STACK = 'ENROLL_STACK';
export const RESET_SELECTED_PLAYER = 'RESET_SELECTED_PLAYER';
export const SAVE_STATE = 'SAVE_STATE';
export const LOAD_STATE = 'LOAD_STATE';
export const FETCH_STATE = 'FETCH_STATE';
export const SAVED = 'SAVED';

export class SetNeedToWin implements Action {
  readonly type = SET_NEED_TO_WIN;
  /**
   * Set points need to win
   * @param payload Points value
   */
  constructor(public payload: number) {}
}
export class CreatePlayer implements Action {
  readonly type = CREATE_PLAYER;
  /**
   * Create the player by name
   * @param payload Player's name
   */
  constructor(public payload: string) {}
}
export class RemovePlayer implements Action {
  readonly type = REMOVE_PLAYER;
  /**
   * Remove player by ID
   * @param payload Player's ID
   */
  constructor(public payload: number) {}
}
export class SelectPlayer implements Action {
  readonly type = SELECT_PLAYER;
  /**
   * Select player by ID to enroll points to the score
   * @param payload Player's ID
   */
  constructor(public payload: number) {}
}
export class ResetState implements Action {
  readonly type = RESET_STATE;
  /**
   * Reset (erase) whole application state: players, limit, etc...
   */
  constructor() {}
}
export class ResetScore implements Action {
  readonly type = RESET_SCORE;
  /**
   * Reset score for all the players
   */
  constructor() {}
}
export class AddToStack implements Action {
  readonly type = ADD_TO_STACK;
  /**
   * Add points to stack for future enroll to score
   * @param payload Point to add
   */
  constructor(public payload: number) {}
}
export class ResetStack implements Action {
  readonly type = RESET_STACK;
  /**
   * Reset the points stack
   */
  constructor() {}
}
export class UndoStack implements Action {
  readonly type = UNDO_STACK;
  /**
   * Undo last adding to the stack
   */
  constructor() {}
}
export class EnrollStack implements Action {
  readonly type = ENROLL_STACK;
  /**
   * Enroll the summ of stack to the selected player score
   */
  constructor() {}
}
export class ResetSelectedPlayer implements Action {
  readonly type = RESET_SELECTED_PLAYER;
  /**
   * Reset selected player
   */
  constructor() { }
}
export class SaveState implements Action {
  readonly type = SAVE_STATE;
  constructor() { }
}
export class LoadState implements Action {
  readonly type = LOAD_STATE;
  constructor() { }
}
export class FetchState implements Action {
  readonly type = FETCH_STATE;
  constructor(public payload: State) { }
}
export class Saved implements Action {
  readonly type = SAVED;
  constructor() { }
}

export type Action =
  SetNeedToWin          |
  CreatePlayer          |
  RemovePlayer          |
  SelectPlayer          |
  ResetState            |
  ResetScore            |
  AddToStack            |
  ResetStack            |
  UndoStack             |
  EnrollStack           |
  ResetSelectedPlayer   |
  SaveState             |
  LoadState             |
  FetchState            |
  Saved;
