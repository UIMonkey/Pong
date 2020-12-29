import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Ball } from './ball';
import { BoardSide } from './boardside';
import { Game } from './game';
import { Player } from './player';
import { Position } from './position';
import { Action, BallState, IMessage, MessageType, PlayerControl, PlayerState } from './server-interface';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

// Initialise a new game
const game = new Game;

// Add all the possible players for now.
const player1 = new Player('player1', BoardSide.left, new Position(0, 50));
const player2 = new Player('player2', BoardSide.right, new Position(100, 50));
const player3 = new Player('player3', BoardSide.top, new Position(50, 0));
const player4 = new Player('player4', BoardSide.bottom, new Position(50, 100));

game.players.push(player1, player2, player3, player4);

// Setup the websocket communication
wss.on('connection', (ws: WebSocket) => {

    // Connection has succeeded, handle messages from the frontend.
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        const receivedMessage = JSON.parse(message) as IMessage;
        console.log('received:', receivedMessage);
        if (receivedMessage.type === MessageType.playerControl) {
            onPlayerControlMessage(receivedMessage as PlayerControl, ws);
        } else {
            console.warn('Not a valid command on the server');
        }
    });

    //send immediatly a feedback to the incoming connection    
    ws.send(JSON.stringify('Connected to backend server'));

    // Send the initial game parameters
    const playerStateMessage = new PlayerState(game.players);
    ws.send(JSON.stringify(playerStateMessage));

    // Start the ball rolling...
    setInterval(() => {
        game.ball.move();
        const ballMessage = new BallState(game.ball);
        ws.send(JSON.stringify(ballMessage));
    }, 100);

});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address()?.toString()}`);
});

/**
 * Handle the control message coming from the frontend
 * TODO - this is currently only designed to handle player 1's movement
 */
function onPlayerControlMessage(playerControl: PlayerControl, ws: WebSocket) {
    // Operate the player in the game the message is meant for
    const controlledPlayer = game.players.find((player) => player.playerId === playerControl.playerId);

    if (controlledPlayer) {
        // Determine what action was made and make the required changes
        switch (playerControl.action) {
            // TODO - apply checking to ensure the boundaries on the game board
            case Action.up:
                controlledPlayer.position.y -= 5;
                break;
            case Action.down:
                controlledPlayer.position.y += 5;
                break;
            default:
                console.warn('Not a valid movement!');
        }
        // Send a control message back to the correct instance of the frontend to move the player
        const playerStateMessage = new PlayerState(game.players);
        ws.send(JSON.stringify(playerStateMessage));

    } else {
        console.warn('Player not found!');
    }

}