import {Chess} from "chess.js";
import {MoveDto, Square} from "./elements";
import {Common} from "./common";
import {log} from "decentraland-ecs";

export class BoardModel {
    get squares(): Square[] {
        return this._squares;
    }
    private chessEngine
    private _squares:Square[]

    constructor() {
        log("CREATING THE BOARD MODEL")
        this.chessEngine = new Chess();
        this._squares = Common.createSquares();
    }

    select(square:Square): Square[] {
        // chess.moves({ square: 'e2' })
        let  moves = this.chessEngine.moves({square: square.getText()});
        return moves.map((square) => {
            return new Square(square.get(0), square.get(1))
        })
    }

    //this needs to be converted to the enums - Piece
    move(fromSquare:Square, toSquare:Square): MoveDto {
        // chess.move({ from: 'g2', to: 'g3' })
        // -> { color: 'w', from: 'g2', to: 'g3', flags: 'n', piece: 'p', san: 'g3' }
        return this.chessEngine.move({from: fromSquare.getText(), to: toSquare.getText()})
    }

    moves(square:Square): MoveDto[] {
        return this.chessEngine.moves({ square: square.getText(), verbose: true });
    }
}