import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../player';
import { GameService } from '../game.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  // TODO: Реализовать удаление пользователей
  @ViewChild('needPointsToWinInput') input: ElementRef;
  needPointsToWin = 200;
  players: Player[] = [];
  addPlayer(playerName: string) {
    if (!playerName) {
      return;
    }
    this.gameService.addPlayer(playerName);
  }
  check() {
    return this.needPointsToWin > 0 && this.players.length > 1;
  }
  constructor(private gameService: GameService) { }
  ngOnInit() {
    this.gameService.players$.subscribe(players => this.players = players);
    fromEvent<Event>(this.input.nativeElement, 'change')
      .pipe(
        map(ev => +(<HTMLInputElement>(ev.target)).value),
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(val => {
        this.needPointsToWin = val;
        this.gameService.setPointsToWin(val);
      });
  }
}
