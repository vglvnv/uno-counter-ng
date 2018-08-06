import { Player } from '../../models/player';
import * as GameActions from '../actions/game.actions';

export interface State {
  players: Player[];
  needToWin: number;
  selectedPlayer: number;
  stack: number[];
  inited?: boolean;
}

export const initialState: State = {
  players: [],
  needToWin: 200,
  selectedPlayer: null,
  stack: []
};

export function reducer(state = initialState, action: GameActions.Action) {
  switch (action.type) {
    case GameActions.SET_NEED_TO_WIN:
      return {
        ...state,
        needToWin: action.payload
      };
    case GameActions.CREATE_PLAYER:
      if (state.players.length === 10) {
        return;
      }
      return {
        ...state,
        players: [...state.players, <Player>{
          id: state.players.length,
          name: action.payload,
          score: 0
        }]
      };
    case GameActions.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players
          .filter(pl => pl.id !== action.payload)
          .map((pl, i) => {
            pl.id = i;
            return pl;
          })
      };
    case GameActions.SELECT_PLAYER:
      return {
        ...state,
        selectedPlayer: action.payload
      };
    case GameActions.RESET_STATE:
      return {
        ...initialState,
        inited: true
      };
    case GameActions.RESET_SCORE:
      return {
        ...state,
        selectedPlayer: null,
        stack: [],
        players: state.players.map(pl => {
          pl.score = 0;
          return pl;
        })
      };
    case GameActions.ADD_TO_STACK:
      return {
        ...state,
        stack: [...state.stack, action.payload]
      };
    case GameActions.RESET_STACK:
      return {
        ...state,
        stack: []
      };
    case GameActions.UNDO_STACK:
      if (state.stack.length === 0) {
        return state;
      }
      return {
        ...state,
        stack: state.stack.filter((_, i, arr) => i !== arr.length - 1)
      };
    case GameActions.ENROLL_STACK:
      if (state.selectedPlayer === null || state.stack.length === 0) {
        return state;
      }
      return {
        ...state,
        players: state.players.map(pl => {
          if (pl.id === state.selectedPlayer) {
            pl.score += state.stack.reduce((acc, el) => acc + el, 0);
          }
          return pl;
        }),
        selectedPlayer: null,
        stack: []
      };
    case GameActions.RESET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayer: null,
        stack: []
      };
    case GameActions.FETCH_STATE:
      return {
        ...(action.payload || state),
        inited: true
      };
    default:
      return state;
  }
}

export const getPlayers = (state: State) => state.players;
export const getNeedPointsToWin = (state: State) => state.needToWin;
export const getSelectedPlayerId = (state: State) => state.selectedPlayer;
export const getStack = (state: State) => state.stack;
export const getInited = (state: State) => state.inited;
