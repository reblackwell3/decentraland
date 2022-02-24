import {PieceColor} from "../board/elements";

export class PlayerModel {
    switchTurn() {
        this._hasTurn = !this._hasTurn
    }
    get hasTurn(): boolean {
        return this._hasTurn;
    }
    get color(): PieceColor {
        return this._color;
    }
    private _color:PieceColor
    private _hasTurn:boolean

    constructor(color:PieceColor) {
        this._color = color
        this._hasTurn = this._color == PieceColor.WHITE
    }
}