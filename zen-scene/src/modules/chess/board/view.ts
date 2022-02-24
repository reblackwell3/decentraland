import {Piece, Square} from "./elements";
import {Common} from "./common";
import {BLACK_WHITE_BOARD_SHAPE} from "../../shape";

export class BoardView extends Entity {

    private _squareViews: SquareView[]
    private _pieceViews: PieceView[]

    constructor(
        transform: Transform
    ) {
        super()
        engine.addEntity(this)
        this.addComponent(BLACK_WHITE_BOARD_SHAPE)
        this.addComponent(transform)
    }

    getSquareView(targetSquare: Square): SquareView {
        // can optimize later with dictionary or array of arrays lookup
        for (let squareView of this._squareViews) {
            if (squareView.square.getText() == targetSquare.getText()) {
                return squareView
            }
        }
    }

    getPieceView(targetPiece: Piece): PieceView {
        // can optimize later with dictionary or array of arrays lookup
        for (let pieceView of this._pieceViews) {
            if (pieceView.piece.value == targetPiece.value && pieceView.piece.startingSquare == pieceView.piece.startingSquare) {
                return pieceView
            }
        }
    }

    viewSelect(fromSquare: Square, toSquares: Square[]) {
        for (let square of toSquares) {
            this.getSquareView(square).highlight();
        }
    }

    viewMove(fromSquare: Square, toSquare: Square) {
        let fromSquareView = this.getSquareView(fromSquare);
        let toSquareView = this.getSquareView(toSquare);
        let fromPiece:Piece = fromSquareView.piece;

        this.getPieceView(fromPiece).moveAnimation(toSquare)

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

    resetEntities() {
        this.removeEntities();
        this.addEntities();
    }

    private removeEntities() {
        this._squareViews.map(s => s.removeEntity())
        this._pieceViews.map(p => p.removeEntity())
        this._squareViews = null
        this._pieceViews = null
    }

    private addEntities() {
        this.createSquareViews();
        this.createPieceViews();
    }

    private createPieceViews() {
        Common.createPieces().map(p => {
            let pieceView = new PieceView(p);
            pieceView.setParent(this.getSquareView(pieceView.piece.startingSquare))
            this._pieceViews.push(pieceView)
        })
    }

    private createSquareViews() {
        Common.createSquares().map(s => {
            let squareView = new SquareView(s);
            squareView.setParent(this)
            this._squareViews.push(squareView)
        })
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
        engine.addEntity(this)
    }

    // todo - create the real movement later
    moveAnimation(toSquare: Square) {
        let transform = this.getComponent(Transform)
        let distance = Vector3.Forward().scale(0.1)
        transform.translate(distance)
        this.setParent(toSquare)
    }

    removeEntity() {
        engine.removeEntity(this)
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
        engine.addEntity(this)
    }

    highlight() {
        // transform color to translucent white
        const blueMaterial = new Material()
        blueMaterial.albedoColor = Color3.Blue()
        blueMaterial.metallic = 0.9
        blueMaterial.roughness = 0.1

        this.addComponent(blueMaterial)
    }

    removeEntity() {
        engine.removeEntity(this)
    }
}