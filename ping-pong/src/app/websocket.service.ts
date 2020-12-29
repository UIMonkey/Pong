import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { delay, filter, map, retryWhen, switchMap, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BoardSide } from './boardside';
import { Player } from './player';
import { IMessage } from './server-interface';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

  player1 = new Player('player1', BoardSide.left, { x: 12, y: 20 });
  
  connection$!: WebSocketSubject<any>;
  RETRY_SECONDS = 10;

  constructor() {
    this.connect().subscribe();
  }

  /**
   * Attempt to setup a connection to the backend via a websocket
   */
  private connect(): Observable<any> {
    return of('ws://localhost:3000').pipe(
      filter(apiUrl => !!apiUrl),
      switchMap(wsUrl => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket({url: wsUrl});
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }

  private closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }

  /**
   * Send messages to the backend server
   */
  public send(message: IMessage) {
    if (this.connection$) {
      this.connection$.next(message);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  /**
   * Get messages from the websocket and pass them on
   */
  public onMessage(): Observable<any> {
    return this.connection$;
  }
}
