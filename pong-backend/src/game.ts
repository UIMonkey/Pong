import { Ball } from "./ball";
import { Player } from "./player";
import { Position } from "./position";

export enum GameState {
    initialised = 'initialised',
    inProgress = 'inProgress',
    finished = 'finished'
}

export class Game {
    players: Player[] = [];
    lives: number[] = [5, 5, 5, 5];
    state = GameState.initialised;
    ball = new Ball(new Position(50, 50));
}
