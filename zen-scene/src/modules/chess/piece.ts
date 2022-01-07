import {NormalGLTFShape} from "../shape";
import {Sound} from "../sound";
import {Player} from "../../player";
import * as utils from "@dcl/ecs-scene-utils";
import {sceneMessageBus} from "../../game";

export enum Piece {
    PAWN= "PAWN", ROOK= "ROOK", KNIGHT= "KNIGHT", BISHOP= "BISHOP", QUEEN= "QUEEN", KING= "KING"
}

export enum PieceColor {
    WHITE= "WHITE", BLACK= "BLACK"
}

export class ChessPieceShape extends NormalGLTFShape {
    constructor(piece: Piece, color: PieceColor) {
        let file_name = `models/${color.toLowerCase()}/${piece.toLowerCase()}.glb`
        log(file_name)
        super(file_name);
    }
}

// Sound
const pickUpSound = new Sound(new AudioClip("sounds/pickUp.mp3"))
const putDownSound = new Sound(new AudioClip("sounds/putDown.mp3"))

export class ChessPiece extends Entity {

    constructor(public id: number, model: GLTFShape, position: Vector3) {
        super()
        engine.addEntity(this)
        this.addComponent(model)
        this.addComponent(new Transform({ position: position }))

        this.addComponent(
            new OnPointerDown(
                () => {
                    if (!Player.holdingPiece) {
                        this.pickup(this.id)
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

    private pickup(id: number): void {
        this.setParent(null)
        pickUpSound.getComponent(AudioSource).playOnce()
        this.setParent(Attachable.FIRST_PERSON_CAMERA)
        this.addComponentOrReplace(
            new utils.Delay(100, () => {
                Player.holdingPiece = true
            })
        )
        sceneMessageBus.emit("ChessPiecePickedUp", { id: id })
    }

    putDown(id: number, placePosition: Vector3): void {
        this.setParent(null)
        putDownSound.getComponent(AudioSource).playOnce()
        Player.holdingPiece = false
        sceneMessageBus.emit("ChessPiecePutDown", { id: id, position: placePosition })
    }

    addPointerDown() {
        this.addComponent(
            new OnPointerDown(
                () => {
                    if (!Player.holdingPiece) {
                        this.pickup(this.id)
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
}
