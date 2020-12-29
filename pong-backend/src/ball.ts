import { Position } from "./position";

export class Ball {
    position: Position;

    xPositive = true;
    yPositive = true;

    constructor(position = new Position) {
        this.position = position;
    }

    move = () => {

        // Determine which direction the ball should move in the x axis
        if (this.position.x >= 100) {
            this.xPositive = false
        } else if (this.position.x <= 0) {
            this.xPositive = true
        }

        if (this.xPositive) {
            this.position.x += 1;
        } else {
            this.position.x -= 1;
        }

        // Determine the y axis
        if (this.position.y >= 100) {
            this.yPositive = false
        } else if (this.position.y <= 0) {
            this.yPositive = true
        }

        if (this.yPositive) {
            this.position.y += 1;
        } else {
            this.position.y -= 1;
        }

    }
}