//BUILD BOARDS

import {NormalGLTFShape} from "../shape";

const blackWhiteBoardShape = new NormalGLTFShape("models/black-white-board.glb")

const brownBlackBoardShape = new NormalGLTFShape("models/brown-black-board.glb")

export enum BoardColor {
    BLACK= "BLACK", BROWN= "BROWN",
}

export type BoardCoordinates = {
    x: number,
    y: number
}

export class Square {
    private _coordinates: BoardCoordinates

    constructor(x: number, y: number) {
        this._coordinates = {x, y}
    }

    get coordinates(): BoardCoordinates {
        return this._coordinates;
    }
}

export class ChessBoard extends Entity {

    get squares(): Square[] {
        return this._squares;
    }

    private _squares: Square[];

    constructor(public id: number, color: BoardColor) {
        super()
        let shape : NormalGLTFShape = color == BoardColor.BLACK ? blackWhiteBoardShape : brownBlackBoardShape
        this.addComponentOrReplace(shape)

        for (let x=0; x<8; x++) {
            for (let y = 0; y < 8; y++) {
                this._squares.push(new Square(x,y))
            }
        }
    }
}