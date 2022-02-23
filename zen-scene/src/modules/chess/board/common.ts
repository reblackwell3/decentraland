import {Piece, PieceColor, PieceValue, Square} from "./elements";

const EIGHT_RANKS_OR_FILES = [0,1,2,3,4,5,6,7];
const RANKS_WITH_PIECES = [0,1,6,7]

export class Common {
    public static createSquares():Square[] {
        let squares:Square[]

        EIGHT_RANKS_OR_FILES.map(rank => {
            EIGHT_RANKS_OR_FILES.map(file => {
                let square = new Square(rank, file);
                squares.push(square)
            })
        })
        return squares
    }

    static createPieces():Piece[] {
        let pieces:Piece[]

        RANKS_WITH_PIECES.map(rank => {
            EIGHT_RANKS_OR_FILES.map(file => {
                let color = (rank == 0 || rank == 1) ? PieceColor.WHITE : PieceColor.BLACK
                let value = this.getPieceValue(rank, file, color);
                pieces.push(new Piece(value, color, new Square(rank, file)))
            })
        })
        return pieces
    }

    private static getPieceValue(rank:number, file:number, color:PieceColor): PieceValue {
        let value;
        switch (rank) {
            case 1:
            case 6:
                value = PieceValue.PAWN
                break;
            case 0:
            case 7:
                switch (file) {
                    case 0:
                    case 7:
                        value = PieceValue.ROOK
                        break;
                    case 1:
                    case 6:
                        value = PieceValue.KNIGHT
                        break;
                    case 2:
                    case 5:
                        value = PieceValue.BISHOP
                        break;
                    case 3:
                        value = color == PieceColor.WHITE ? PieceValue.QUEEN : PieceValue.KING
                        break;
                    case 4:
                        value = color == PieceColor.WHITE ? PieceValue.KING : PieceValue.QUEEN
                        break;
                }
                break;
        }
        return value
    }
}