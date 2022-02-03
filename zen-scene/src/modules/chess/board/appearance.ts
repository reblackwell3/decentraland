import {NormalGLTFShape} from "../../shape";

enum BoardModel {
    BLACKWHITE = "models/black-white-board.glb",
    BROWNBLACK = "models/brown-black-board.glb"
}

export class BoardShape extends NormalGLTFShape{
    constructor(model: BoardModel) {
        super(model)
    }
}