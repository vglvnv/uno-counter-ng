import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Player } from '../player';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  player: Player;
  stack: number[] = [];
  needToWin: number;

  getSumm() {
    return this.stack.reduce((acc, val) => acc + val, 0);
  }
  getUpToWin() {
    return this.needToWin - this.player.score;
  }
  undo() {
    this.stack.pop();
  }
  onSubmit() {
    this.gameService.addPointsTo(this.player.id, this.getSumm());
    this.router.navigate(['status']);
  }

  ngOnInit() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.gameService.players$.subscribe(players => {
      const player = players.find(el => el.id === userId);
      if (!player) {
        this.router.navigate(['init']);
        return;
      }
      this.player = player;
    });
    this.gameService.needPointsToWin$.subscribe(val => this.needToWin = val);
  }

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
}
