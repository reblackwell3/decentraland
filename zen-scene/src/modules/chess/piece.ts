import {NormalGLTFShape} from "../shape";
import {Sound} from "../sound";
import {Player} from "../../player";
import * as utils from "@dcl/ecs-scene-utils";
import {sceneMessageBus} from "../../game";
import {Square} from "./board";

export enum Piece {
    PAWN= "PAWN", ROOK= "ROOK", KNIGHT= "KNIGHT", BISHOP= "BISHOP", QUEEN= "QUEEN", KING= "KING"
}

export enum PieceColor {
    WHITE= "WHITE", BLACK= "BLACK"
}

export type PieceDetails = {
    rank: Piece,
    color: PieceColor
}

export class ChessPieceShape extends NormalGLTFShape {
    constructor(details: PieceDetails) {
        let file_name = `models/${details.color.toLowerCase()}/${details.rank.toLowerCase()}.glb`
        log(file_name)
        super(file_name);
    }
}

// Sound
const pickUpSound = new Sound(new AudioClip("sounds/pickUp.mp3"))
const putDownSound = new Sound(new AudioClip("sounds/putDown.mp3"))

export class ChessPiece extends Entity {

    constructor(public id: number, details: PieceDetails, position: Vector3) {
        super()
        engine.addEntity(this)
        this.addComponent(new ChessPieceShape(details))
        this.addComponent(new Transform({ position: position }))

        this.addComponent(
            new OnPointerDown(
                () => {
                        this.selectPiece(this.id)
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "pick up",
                }
            )
        )

        this.addComponent(
            new OnPointerDown(
                () => {
                    if (ChessBoard this.id) {
                        this.moveToSquare(Player.selectedPieceId, Player.selectedSquare)
                    }
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "pick up",
                }
            )
        )


    }

    private selectPiece(pieceId: number): void {
        this.setParent(null)
        pickUpSound.getComponent(AudioSource).playOnce()
        this.setParent(Attachable.FIRST_PERSON_CAMERA)
        this.addComponentOrReplace(
            new utils.Delay(100, () => {
                Player.selectedPieceId = pieceId
            })
        )
        sceneMessageBus.emit("ChessPieceSelected", { id: pieceId })
    }

    private moveToSquare(square: Square): void {
        this.setParent(null)
        putDownSound.getComponent(AudioSource).playOnce()
        sceneMessageBus.emit("ChessPieceMoved", { id: Player.selectedPieceId, square: square })
        Player.selectedPieceId = null
    }

    addPointerDown() {
        this.addComponent(
            new OnPointerDown(
                () =>
                {
                    this.selectPiece(this.id)
                },
                {
                    button: ActionButton.PRIMARY,
                    showFeedback: true,
                    hoverText: "move piece",
                }
            )
        )
    }
}
