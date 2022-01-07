//BUILD BOARDS

import {NormalGLTFShape} from "../shape";

const blackWhiteBoardShape = new NormalGLTFShape("models/black-white-board.glb")

const brownBlackBoardShape = new NormalGLTFShape("models/brown-black-board.glb")

export enum BoardColor {
    BLACK= "BLACK", BROWN= "BROWN",
}

export class ChessBoard extends Entity {
    constructor(public id: number, color: BoardColor) {
        super()
        let shape : NormalGLTFShape = color == BoardColor.BLACK ? blackWhiteBoardShape : brownBlackBoardShape
        this.addComponentOrReplace(shape)
    }
}