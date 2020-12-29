import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Ball } from './ball';
import { Game } from './game';
import { Player } from './player';
import { IBallState, IMessage, IPlayerState, MessageType } from './server-interface';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  game = new Game;
  // Player id will be assigned by the backend and given to the frontend. Will need to be made asynchronous
  private playerId = 'player1';
  private players$ = new Observable<Player[]>();

  constructor(private wsService: WebsocketService) {
    // Subscribe to messages from the websocket service for the player states
    this.players$ = wsService.onMessage().pipe(
      filter((serverMessage: IMessage) => serverMessage?.type === MessageType.playerState),
      map(serverMessage => {
        const playerStateMessage = serverMessage as IPlayerState;
        return playerStateMessage.players;
      })
    );
  }

  /**
   * Make the players information available to anyone who wants to subscribe
   */
  getPlayers(): Observable<Player[]> {
    return this.players$;
  }

  /**
   * Get the ball information
   */
  getBall(): Observable<Ball> {
    return this.wsService.onMessage().pipe(
      filter((serverMessage: IMessage) => serverMessage?.type === MessageType.ballState),
      map(serverMessage => {
        const ballStateMessage = serverMessage as IBallState;
        return ballStateMessage.ball;
      }),
      tap(ball => console.log('Ball', ball))
    );
  }

  /**
   * Allow the consumer to get which player this instance of the application belongs to.
   */
  getPlayerId(): Observable<string> {
    return of(this.playerId);
  }

}
