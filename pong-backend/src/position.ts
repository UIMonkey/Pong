
/**
 * Position class.
 * The x and y positions are given as a percentage of the board. e.g. x = 0% is on the left had edge. x = 100% is on the right hand edge.
 */
export class Position {
    x: number;
    y: number;

    constructor(xPos = 0, yPos = 0) {
        this.x = xPos;
        this.y = yPos;
    }
}