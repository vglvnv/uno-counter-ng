import { Injectable } from '@angular/core';
import { Player } from './player';
import { BehaviorSubject } from '../../node_modules/rxjs';

const DEFAULT_POINTS_TO_WIN = 200;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  players: Player[] = [];
  needPointsToWin$: BehaviorSubject<number> = new BehaviorSubject<number>(DEFAULT_POINTS_TO_WIN);
  players$: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  addPlayer(player: string | Player) {
    const playerInst: Player = typeof player === 'string' ? <Player>{
      name: player,
      score: 0
    } : player;
    const id = this.players.push(playerInst) - 1;
    this.players[id].id = id;
    this._updatePlayers();
  }
  removePlayer(playerId: number) {
    this.players.filter(pl => pl.id !== playerId);
    this._updatePlayersId();
  }
  removeAllPlayers() {
    this.players = [];
    this._updatePlayers();
  }
  addPointsTo(playerId: number, points: number) {
    const player = this.players.find(el => el.id === playerId);
    player.score += points;
    this._updatePlayers();
  }
  setPointsToWin(points: number) {
    this.needPointsToWin$.next(points);
  }
  rematch() {
    this.players.forEach((_, i , arr) => arr[i].score = 0);
    this._updatePlayers();
  }
  newGame() {
    this.removeAllPlayers();
    this.needPointsToWin$.next(DEFAULT_POINTS_TO_WIN);
    this._updatePlayers();
  }
  private _updatePlayersId() {
    this.players.forEach((_, i , arr) => arr[i].id = i);
    this._updatePlayers();
  }
  private _updatePlayers() {
    this.players$.next(this.players);
  }
  constructor() { }
}
