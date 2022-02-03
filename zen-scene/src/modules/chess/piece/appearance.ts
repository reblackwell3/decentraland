import {NormalGLTFShape} from "../../shape";
import {PieceColor, PieceRank} from "./piece";

export class ChessPieceShape extends NormalGLTFShape {
    constructor(rank: PieceRank, color: PieceColor) {
        let file_name = `models/${color.toLowerCase()}/${rank.toLowerCase()}.glb`
        super(file_name);
    }
}