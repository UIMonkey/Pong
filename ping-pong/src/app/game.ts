import { Subject } from 'rxjs';
import { Player } from './player';

export enum GameState {
    initialised = 'initialised',
    inProgress = 'inProgress',
    finished = 'finished'
}

export class Game {
    players: Subject<Player[]> = new Subject();
    lives: number[] = [5, 5, 5, 5];
    state = GameState.initialised;
}
