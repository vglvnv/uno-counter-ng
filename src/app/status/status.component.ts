import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../player';
import { ModalComponent } from '../modal/modal.component';
import { GameService } from '../game.service';

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
  upToWin() { }
  isGameOver() { }
  winnerClass() { }
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
    // TODO: редирект на init
  }
  constructor(private gameService: GameService) { }
  ngOnInit() {
    this.gameService.players$.subscribe(players => this.players = players);
  }
}
