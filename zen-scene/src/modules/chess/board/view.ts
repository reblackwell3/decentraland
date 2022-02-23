import {Square} from "./model";

export class BoardView {

    squares: Square[]

    getSquare(targetSquare: Square): Square {
        // can optimize later with dictionary or array of arrays lookup
        for (let square of this.squares) {
            if (square.getText() == targetSquare.getText()) {
                return square
            }
        }
    }

}

export const blueMaterial = new Material()
blueMaterial.albedoColor = Color3.Blue()
blueMaterial.metallic = 0.9
blueMaterial.roughness = 0.1

export class View {

    private boardView: BoardView

    constructor(boardView: BoardView) {
        this.boardView = boardView
    }

    viewSelect(fromSquare: Square, toSquares: Square[]) {
        for (let square of toSquares) {
            this.highlight(square);
        }
    }

    private highlight(square: Square) {
        // transform color to translucent white
        this.boardView.getSquare(square).addComponent(blueMaterial)
    }

    viewMove(fromSquare: Square, toSquare: Square) {
        let fromPiece = this.boardView.getSquare(fromSquare).piece;
        this.boardView.getSquare(toSquare).piece = fromPiece
        this.boardView.getSquare(fromSquare).piece = null;
    }

    viewNoMoves(fromSquare: Square) {
        // do this later
    }

    viewCancelSelect() {
        // do this later
    }
}