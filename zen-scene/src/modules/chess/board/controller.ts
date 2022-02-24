// INPUT

// Instance the input object
import {BoardModel} from "./model";
import {BoardView} from "./view";
import {Square} from "./elements";

const input = Input.instance

export class BoardController {
    private boardModel:BoardModel
    private boardView:BoardView

    private _fromSquare:Square

    constructor(model:BoardModel, view:BoardView) {
        this.boardModel = model
        this.boardView = view
    }

    // this will only be setup on valid from squares
    select(fromSquare:Square) {
        this._fromSquare = fromSquare
        let toSquares = this.boardModel.select(fromSquare);
        if (toSquares != null) {
            this.boardView.viewSelect(fromSquare, toSquares);
        } else {
            this.boardView.viewNoMoves(fromSquare)
            this._fromSquare = null
        }
    }

    move(fromSquare: Square, toSquare: Square) {
        let moveDto = this.boardModel.move(fromSquare, toSquare);
        if (moveDto != null) {
            this.boardView.viewMove(fromSquare, toSquare);
        } else {
            this.boardView.viewCancelSelect();
        }
        this._fromSquare = null;
    }

    private setupMoves(square: Square) {
        input.subscribe("BUTTON_DOWN", ActionButton.POINTER, true, (e) => {
            if (e.hit) {
                let hitEntity = engine.entities[e.hit.entityId]
                if (hitEntity instanceof Square) {
                    let hitSquare = hitEntity as Square
                    if (this._fromSquare !== null) {
                        this.move(this._fromSquare, hitSquare)
                    } else {
                        this.select(hitSquare)
                    }
                }
            }
        })
    }
}