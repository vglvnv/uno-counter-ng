import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../models/player';

const COLOR_MAP = [
  'blue',
  'pink',
  'yellow',
  'indigo',
  'red',
  'green',
  'cyan',
  'purple',
  'orange',
  'teal'
];

@Component({
  selector: 'app-player-badge',
  templateUrl: './player-badge.component.html',
  styleUrls: ['./player-badge.component.scss']
})
export class PlayerBadgeComponent implements OnInit {
  @Input() player: Player;

  getClass = () => `badge ${COLOR_MAP[this.player.id]}`;

  constructor() { }
  ngOnInit() { }
}
