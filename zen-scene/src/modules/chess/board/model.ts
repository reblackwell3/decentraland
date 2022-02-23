import {Chess} from "chess.js";
import {MoveDto, Square} from "./elements";

export class Model {
    get squares(): Square[] {
        return this._squares;
    }
    private chessEngine = new Chess();
    private _squares = this.createSquares()

    private createSquares():Square[] {
        let squares:Square[]
        const EIGHT_RANKS_OR_FILES = [0,1,2,3,4,5,6,7];
        EIGHT_RANKS_OR_FILES.map(rank => {
            EIGHT_RANKS_OR_FILES.map(file => {
                let square = new Square(rank, file);
                squares.push(square)
            })
        })
        return squares
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