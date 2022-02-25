import { Player } from '../../interfaces/player.interface';

export class UpdatePlayer {
  static readonly type = '[Player] Update Player';
  constructor(public player: Player) {}
}

export class UpdateAllPlayers {
  static readonly type = '[Player] Update All Player';
  constructor(public players: Player[]) {}
}


