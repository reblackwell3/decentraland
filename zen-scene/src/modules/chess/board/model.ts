import {Chess, Move, PartialMove} from "@chess.ts";
import {Square} from "./elements";
import {Common} from "./common";

// todo - the model has a problem because the chess.ts module
// todo - may not be loading correctly

// todo - it looks like in tsconfig.json or package.json
// todo - there is some problem and the module is not getting
// todo - put into bin/game.js

export class BoardModel {
    get squares(): Square[] {
        return this._squares;
    }
    private chessEngine:Chess
    private _squares:Square[]

    constructor() {
        log("CREATING THE BOARD MODEL")
        // this.chessEngine = new Chess();
        this._squares = Common.createSquares();
    }

    private readonly CHARCODE_LOWERCASE_A = 97;

    select(square:Square): Square[] {
        // chess.moves({ square: 'e2' })
        let moves:Move[] = this.chessEngine.moves({square: square.getText(), verbose:true});
        return moves.map((move) => {
            return new Square(+move.to.charAt(1), move.to.charCodeAt(0) - this.CHARCODE_LOWERCASE_A)
        })
    }

    //this needs to be converted to the enums - Piece
    move(fromSquare:Square, toSquare:Square): Move {
        // chess.move({ from: 'g2', to: 'g3' })
        // -> { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' }
        let partialMove:PartialMove = {from: fromSquare.getText(), to: toSquare.getText()}
        return this.chessEngine.move(partialMove)
    }

    moves(square:Square): Move[] {
        return this.chessEngine.moves({ square: square.getText(), verbose: true });
    }
}