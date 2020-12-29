import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ball } from '../ball';
import { GameService } from '../game.service';
import { Player, UserInput } from '../player';
import { PlayerControlService } from '../player-control.service';

/**
 * This component holds the logic for containing the game board and displaying all players.
 */
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  players$ = new Observable<Player[]>();
  ball$ = new Observable<Ball>();

  constructor(
    private gameService: GameService,
    private playerControlService: PlayerControlService
  ) {
  }

  /**
   * Add host listener to handle the user input on the keyboard
   * @param event 
   */
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    // Make sure input can handle captials as well
    switch (event.key.toLowerCase()) {
      case UserInput.up:
        this.playerControlService.moveUp();
        break;
      case UserInput.down:
        this.playerControlService.moveDown();
        break;
      default:
        // TODO - Show message on screen to user instead
        console.warn('Invalid input! Try pressing w or s');
    }
  }

  ngOnInit(): void {
    // Subscribe to the player information when the component is initialised
    this.players$ = this.gameService.getPlayers();

    this.ball$ = this.gameService.getBall();
  }

}
