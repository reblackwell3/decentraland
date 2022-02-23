import {Piece, PieceValue, Square} from "./elements";
import {Entity} from "decentraland-ecs";
import {Common} from "./common";

export class BoardView extends Entity {

    squareViews: SquareView[]
    pieceViews: PieceView[]

    constructor() {
        super();
        let squares = Common.createSquares();
        for (let square of squares) {
            this.squareViews.push(new SquareView(square))
        }
        let pieces = Common.createPieces();
        for (let piece of pieces) {
            this.pieceViews.push(new PieceView(piece))
        }
    }

    resetPieces() {

    }

    getSquareView(targetSquare: Square): SquareView {
        // can optimize later with dictionary or array of arrays lookup
        for (let squareView of this.squareViews) {
            if (squareView.square.getText() == targetSquare.getText()) {
                return squareView
            }
        }
    }

    getPieceView(targetPiece: Piece): PieceView {
        // can optimize later with dictionary or array of arrays lookup
        for (let pieceView of this.pieceViews) {
            if (pieceView.piece.value == targetPiece.value && pieceView.piece.startingSquare == pieceView.piece.startingSquare) {
                return pieceView
            }
        }
    }

}

export class PieceView extends Entity {
    get piece(): Piece {
        return this._piece;
    }
    private _piece:Piece
    constructor(piece:Piece) {
        super()
        this._piece = piece
    }

    // todo - create the real movement later
    moveAnimation(toSquare: Square) {
        let transform = this.getComponent(Transform)
        let distance = Vector3.Forward().scale(0.1)
        transform.translate(distance)
    }

}

export class SquareView extends Entity {
    get piece(): Piece {
        return this._piece;
    }

    set piece(value: Piece) {
        this._piece = value;
    }
    get square(): Square {
        return this._square;
    }
    private _square:Square
    private _piece:Piece
    constructor(square:Square) {
        super();
        this._square = square
    }

    public highlight() {
        // transform color to translucent white
        const blueMaterial = new Material()
        blueMaterial.albedoColor = Color3.Blue()
        blueMaterial.metallic = 0.9
        blueMaterial.roughness = 0.1

        this.addComponent(blueMaterial)
    }
}

export class View {

    private boardView: BoardView

    constructor(boardView:BoardView) {
        this.boardView = boardView
    }

    viewSelect(fromSquare: Square, toSquares: Square[]) {
        for (let square of toSquares) {
            this.boardView.getSquareView(square).highlight();
        }
    }

    viewMove(fromSquare: Square, toSquare: Square) {
        let fromSquareView = this.boardView.getSquareView(fromSquare);
        let toSquareView = this.boardView.getSquareView(toSquare);
        let fromPiece:Piece = fromSquareView.piece;

        this.boardView.getPieceView(fromPiece).moveAnimation(toSquare)

        fromSquareView.piece = null
        toSquareView.piece = fromPiece
        // can just remove entity and create new entity - engine
    }

    viewNoMoves(fromSquare: Square) {
        // todo - do this later
    }

    viewCancelSelect() {
        // todo - do this later
    }

    removePiece(piece:Piece) {
        let pieceView:Entity = this.boardView.getPieceView(piece);
        engine.removeEntity(pieceView);
    }

}