import { Ball } from './ball';
import { IPlayer, Player } from './player';

/**
 * List the types of messages that are possible
 */
export enum MessageType {
    playerControl = 'playerControl',
    playerState = 'playerState',
    ballState = 'ballState'
}

/**
 * Define a basic message structure to be sent between the server and frontend
 */
export interface IMessage {
    type: MessageType;
}

/**
 * Enum to describe the input of the user
 */
export enum Action {
    up = 'up',
    down = 'down'
}

/**
 * This class contains the structure of the player control messages being sent to the server.
 */
export class PlayerControl implements IMessage {
    type = MessageType.playerControl;
    action = Action.up;
    playerId = '';

    constructor(playerId: string, action: Action) {
        this.action = action;
        this.playerId = playerId;
    }
}

/**
 * Describes the current state of all the player's paddle, e.g. position
 */
export interface IPlayerState extends IMessage {
    type: MessageType;
    players: Player[];
}

export class PlayerState implements IPlayerState {
    type = MessageType.playerState;
    players: IPlayer[] = [];

    constructor(players: IPlayer[]) {
        this.players = players;
    }
}

export interface IBallState extends IMessage {
    type: MessageType;
    ball: Ball;
}

export class BallState implements IBallState {
    type = MessageType.ballState;
    ball: Ball;

    constructor(ball: Ball) {
        this.ball = ball;
    }
}
