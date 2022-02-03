import {BoardShape} from "./appearance";

export type BoardDetails = {
    id: number,
    shape: BoardShape,
    position: Vector3
}

export class ChessBoard extends Entity {
    constructor(public details: BoardDetails) {
        super()
        this.addComponentOrReplace(details.shape)
        this.addComponentOrReplace(new Transform({ position: details.position }))
    }
}