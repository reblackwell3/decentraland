// INPUT

// Instance the input object
import {Model} from "./model";
import {View} from "./view";
import {Square} from "./elements";

const input = Input.instance

// input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (event) => {
//     if (Player.selectedPieceId && event.hit) {
//         for (let i = 0; i < chessPieces.length; i++) {
//             if (chessPieces[i].getParent()?.alive) { chessPieces[i].putDown(i, event.hit.hitPoint) }
//         }
//     }
// }

export class Controller {
    private model:Model
    private view:View

    private _fromSquare:Square

    constructor(model:Model, view:View) {
        this.model = model
        this.view = view
    }

    // this will only be setup on valid from squares
    select(fromSquare:Square) {
        this._fromSquare = fromSquare
        let toSquares = this.model.select(fromSquare);
        if (toSquares != null) {
            this.view.viewSelect(fromSquare, toSquares);
        } else {
            this.view.viewNoMoves(fromSquare)
            this._fromSquare = null
        }
    }

    move(fromSquare: Square, toSquare: Square) {
        let moveDto = this.model.move(fromSquare, toSquare);
        if (moveDto != null) {
            this.view.viewMove(fromSquare, toSquare);
        } else {
            this.view.viewCancelSelect();
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