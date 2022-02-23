//======== PIECE ==========

export enum PieceValue {
    PAWN, ROOK, KNIGHT, BISHOP, KING, QUEEN
}

export enum PieceColor {
    WHITE = "white", BLACK="black"
}

export class Piece {
    get color(): PieceColor {
        return this._color;
    }
    get value(): PieceValue {
        return this._value;
    }
    // this is an id - so that two rooks are different
    get startingSquare(): Square {
        return this._startingSquare;
    }
    private _value:PieceValue
    private _color:PieceColor
    private _startingSquare:Square

    constructor(value:PieceValue, color:PieceColor, square:Square) {
        this._value = value
        this._color = color
        this._startingSquare = square
    }
}

// ====== SQUARE =======

export class Square {

    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }

    private rank:number
    private file:number

    private _piece:Piece

    constructor(rank:number, file:number) {
        if (rank < 0 || rank > 8) {
            throw RangeError("rank should be between 0 and 7 inclusive")
        } else if (file < 0 || file > 8) {
            throw RangeError("file should be between 0 and 7 inclusive")
        }
        this.rank = rank
        this.file = file
    }

    getText() {
        return this.toLetter(this.file) + this.rank.toString()
    }

    private toLetter(file: number): String {
        const LETTER_A_CHAR_CODE = 65;
        let charCode = LETTER_A_CHAR_CODE + file;
        let letter = String.fromCharCode(charCode);
        log("File number: " + file + " from charCode: " + charCode + " to letter: " + letter)
        return letter
    }
}

// ======== MODEL =========

export type MoveDto = {
    color:String,
    from:Square,
    to:Square,
    flags:String,
    piece:PieceValue,
    san:String
}