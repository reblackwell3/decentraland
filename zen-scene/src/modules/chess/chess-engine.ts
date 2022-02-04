import {GameEngine} from "../game-int";
import {Chess} from "chess.js";

export class ChessEngine extends GameEngine {

    private chess = new Chess();

    isValid(move: String): boolean {
        return this.chess.moves().includes(move)
    }

    //engine will return null if move fails
    //null converted to false
    move(move: String): boolean {
        return this.chess.move(move) != null
    }

    //this method will be for debugging purposes
    ascii(): String {
        return this.chess.ascii()
    }

}