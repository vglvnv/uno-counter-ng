import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../player';
import { ModalComponent } from '../modal/modal.component';
import { GameService } from '../game.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @ViewChild('rematchModal') rematchModal: ModalComponent;
  @ViewChild('newGameModal') newGameModal: ModalComponent;
  needToWin: number;
  players: Player[] = [];
  upToWin(player: Player) {
    return this.getWinner() === player ? '' :  this.needToWin - player.score;
  }
  getAddLink(player: Player) {
    return ['/add', player.id];
  }
  getWinner(): Player {
    return this.players.find(el => el.score >= this.needToWin);
  }
  isGameOver(): boolean {
    return !!this.getWinner();
  }
  winnerClass(player: Player) {
    return this.getWinner() === player ? 'table-success' : '';
  }
  rematch(confirmed?: boolean) {
    if (!confirmed) {
      this.rematchModal.show(true);
      return;
    }
    this.rematchModal.show(false);
    this.gameService.rematch();
  }
  newGame(confirmed?: boolean) {
    if (!confirmed) {
      this.newGameModal.show(true);
      return;
    }
    this.newGameModal.show(false);
    this.gameService.newGame();
    this.router.navigate(['init']);
  }
  ngOnInit() {
    this.gameService.players$.subscribe(players => {
      if (players.length === 0) {
        this.router.navigate(['init']);
        return;
      }
      this.players = players;
    });
    this.gameService.needPointsToWin$.subscribe(value => this.needToWin = value);
  }
  constructor(
    private gameService: GameService,
    private router: Router
  ) { }
}
