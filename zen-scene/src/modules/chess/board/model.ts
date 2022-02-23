import {Chess} from "chess.js";

//======== PIECE ==========

export enum Piece {
    PAWN, ROOK, KNIGHT, BISHOP, KING, QUEEN
}

// ====== SQUARE =======
export enum Rank {
    a="A", b="B", c="C", d="D", e="E", f="F", g="G", h="H"
}

export enum File {
    ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT
}

export class Square extends Entity {
    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }
    private rank
    private file

    private _piece:Piece

    constructor(rank:Rank, file:File) {
        super()
        this.rank = rank
        this.file = file
    }

    getText() {
        return this.rank + this.file
    }
}

// ======== MODEL =========

export type MoveDto = {
    color:String,
    from:Square,
    to:Square,
    flags:String,
    piece:Piece,
    san:String
}

export class Model {
    get squares(): Square[] {
        return this._squares;
    }
    private chessEngine = new Chess();
    private _squares = this.createSquares()

    private createSquares():Square[] {
        let squares:Square[]
        Object.keys(Rank).map(rank => {
            Object.keys(File).map(file => {
                let square = new Square(Rank[rank], File[file]);
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