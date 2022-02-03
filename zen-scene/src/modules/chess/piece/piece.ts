import {Player} from "../../../player";
import * as utils from "@dcl/ecs-scene-utils";
import {ChessPieceShape} from "./appearance";

export enum PieceRank {
    PAWN= "PAWN", ROOK= "ROOK", KNIGHT= "KNIGHT", BISHOP= "BISHOP", QUEEN= "QUEEN", KING= "KING"
}

export enum PieceColor {
    WHITE= "WHITE", BLACK= "BLACK"
}

export type PieceDetails = {
    id: number,
    rank: PieceRank,
    color: PieceColor,
    shape: ChessPieceShape,
    position: Vector3
}

export class ChessPiece extends Entity {

    constructor(public details: PieceDetails) {
        super()
        engine.addEntity(this)
        this.addComponent(details.shape)
        this.addComponent(new Transform({ position: details.position }))

        this.addComponent(
            new OnPointerDown(
                () => {
                        this.selectPiece(this.details.id)
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

    private selectPiece(id: number): void {
        this.setParent(null)
        pickUpSound.getComponent(AudioSource).playOnce()
        this.setParent(Attachable.FIRST_PERSON_CAMERA)
        this.addComponentOrReplace(
            new utils.Delay(100, () => {
                Player.selectedPieceId = id
            })
        )
        sceneMessageBus.emit("ChessPieceSelected", { id: pieceId })
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
