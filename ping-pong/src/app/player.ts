import { BoardSide } from './boardside';
import { Position } from './position';

export enum UserInput {
    up = 'w',
    down = 's'
}

export interface IPlayer {
    playerId: string;
    side: BoardSide;
    position: Position;
}

export class Player implements IPlayer {
    playerId = '';
    side = BoardSide.left;
    position = new Position();

    constructor(playerId = '', side = BoardSide.left, position = new Position) {
        this.playerId = playerId;
        this.side = side;
        this.position = position;
    }
}