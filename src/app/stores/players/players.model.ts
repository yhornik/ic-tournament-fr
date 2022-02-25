import { Player } from '../../interfaces/player.interface';

export interface PlayerSelected {
  id: string;
  isSelected: boolean;
}

export interface PlayersModel {
  selected: Array<PlayerSelected>;
  players: Array<Player>;
}
