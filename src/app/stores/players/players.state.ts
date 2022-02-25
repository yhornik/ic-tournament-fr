import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { PlayerService } from '../../services/player.service';
import { UpdateAllPlayers, UpdatePlayer } from './players.action';
import { PlayersModel } from './players.model';

@State<PlayersModel>({
  name: 'players',
  defaults: {
    selected: [],
    players: []
  }
})
@Injectable()
export class PlayersState {
  constructor(private playerService: PlayerService) {
  }
  @Action(UpdateAllPlayers)
  updateAllPlayers(ctx: StateContext<PlayersModel>, action: UpdateAllPlayers) {
    const state = ctx.getState();
    ctx.patchState({
      players: [
        ...state.players,
      ]
    });
  }

  @Action(UpdatePlayer)
  updatePlayer(ctx: StateContext<PlayersModel>, action: UpdatePlayer) {
    const state = ctx.getState();
    ctx.patchState({
      players: [
        ...state.players, action.player
      ]
    });
  }
}
