import { createSelector } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromGame from '../reducers/game.reducers';
import { Player } from '../../models/player';

export const getPlayers = createSelector(
  fromRoot.getGameState,
  fromGame.getPlayers
);
export const getNeedPointsToWin = createSelector(
  fromRoot.getGameState,
  fromGame.getNeedPointsToWin
);
export const getSelectedPlayerId = createSelector(
  fromRoot.getGameState,
  fromGame.getSelectedPlayerId
);
export const getStack = createSelector(
  fromRoot.getGameState,
  fromGame.getStack
);
export const getIsInitialized = createSelector(
  fromRoot.getGameState,
  fromGame.getIsInitialized
);

export const getPlayersExtended = createSelector(
  getPlayers,
  getNeedPointsToWin,
  (players: Player[], toWin: number) =>
    players.map(pl => {
      pl.upToWin = toWin - pl.score;
      return pl;
    })
);

export const getSelectedPlayer = createSelector(
  getPlayersExtended,
  getSelectedPlayerId,
  (players: Player[], playerId: number) => players.find(pl => pl.id === playerId)
);

export const isReadyToPlay = createSelector(
  getPlayers,
  getNeedPointsToWin,
  (players: Player[], toWin: number) => players.length > 1 && toWin > 0
);

export const getWinner = createSelector(
  getPlayers,
  getNeedPointsToWin,
  (players: Player[], toWin: number) => players.find(el => el.score >= toWin)
);

export const getStackSum = createSelector(
  getStack,
  (stack: number[]) => stack.reduce((acc, el) => acc + el, 0)
);

export const isGameOver = createSelector(
  getWinner,
  (winner: Player) => !!winner
);

export const isNeedToBeInitialized = createSelector(
  getPlayers,
  getIsInitialized,
  (players, isInitialized) => isInitialized && players.length === 0
);

export const getNeedToWinForSelectedPlayer = createSelector(
  getStackSum,
  getSelectedPlayer,
  (stackSum, selectedPlayer) =>
    selectedPlayer && selectedPlayer.upToWin && (stackSum > selectedPlayer.upToWin ? 0 : selectedPlayer.upToWin - stackSum)
);
