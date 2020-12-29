import { Position } from "./position";

export class Ball {
    position: Position;

    constructor(position = new Position) {
        this.position = position;
    }
}