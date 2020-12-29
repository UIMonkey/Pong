import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Action, PlayerControl } from './server-interface';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerControlService {

  playerId = '';

  constructor(
    private gameService: GameService,
    private wsService: WebsocketService
  ) {
    // subscribe to the player id information that originates from the backend
    this.gameService.getPlayerId().subscribe((playerId: string) => this.playerId = playerId);
  }

  moveUp() {
    const playerId = this.gameService.getPlayerId();
    this.wsService.send(new PlayerControl(this.playerId, Action.up));
  }

  moveDown() {
    this.wsService.send(new PlayerControl(this.playerId, Action.down));
  }
}
