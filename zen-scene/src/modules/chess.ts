import * as utils from "@dcl/ecs-scene-utils"
import { Sound } from "./sound"
import { Player } from "../player"
import { sceneMessageBus } from "../game"
import { NormalGLTFShape } from "./shape";

enum Piece {
    PAWN= "PAWN", ROOK= "ROOK", KNIGHT= "KNIGHT", BISHOP= "BISHOP", QUEEN= "QUEEN", KING= "KING"
}

enum Color {
    WHITE= "WHITE", BLACK= "BLACK"
}

class ChessPieceShape extends NormalGLTFShape {
    constructor(piece: Piece, color: Color) {
        let file_name = `models/${color.toLowerCase()}/${piece.toLowerCase()}.glb`
        log(file_name)
        super(file_name);
    }
}

// Sound
const pickUpSound = new Sound(new AudioClip("sounds/pickUp.mp3"))
const putDownSound = new Sound(new AudioClip("sounds/putDown.mp3"))

// Multiplayer
type ChessPieceState = {
    id: number,
    position: Vector3
}

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

sceneMessageBus.on("ChessPiecePickedUp", (state: ChessPieceState) => {
    chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z)
})

sceneMessageBus.on("ChessPiecePutDown", (state: ChessPieceState) => {
    chessPieces[state.id].getComponent(Transform).rotation.set(0, 0, 0, 1)
    chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z)
})

// NOTE: We're matching the beer object's position in the array with the id - this is not good
const ChessPiece1 = new ChessPiece(0, new ChessPieceShape(Piece.PAWN, Color.WHITE), new Vector3(8.3, 1.25, 8))
const ChessPiece2 = new ChessPiece(1, new ChessPieceShape(Piece.PAWN, Color.WHITE), new Vector3(7.8, 1.25, 8.3))
const ChessPiece3 = new ChessPiece(2, new ChessPieceShape(Piece.PAWN, Color.WHITE), new Vector3(1.86, 0.8, 13.4))
const ChessPiece4 = new ChessPiece(3, new ChessPieceShape(Piece.BISHOP, Color.BLACK), new Vector3(2.3, 0.8, 14))
const ChessPiece5 = new ChessPiece(4, new ChessPieceShape(Piece.BISHOP, Color.WHITE), new Vector3(13.7, 0.8, 13.8))
const ChessPiece6 = new ChessPiece(5, new ChessPieceShape(Piece.PAWN, Color.BLACK), new Vector3(13.9, 0.8, 14.3))
const ChessPiece7 = new ChessPiece(6, new ChessPieceShape(Piece.PAWN, Color.WHITE), new Vector3(14.5, 0.8, 2.5))
const ChessPiece8 = new ChessPiece(7, new ChessPieceShape(Piece.PAWN, Color.WHITE), new Vector3(13.7, 0.8, 1.9))
const ChessPiece9 = new ChessPiece(8, new ChessPieceShape(Piece.QUEEN, Color.WHITE), new Vector3(2.4, 0.8, 1.5))
const ChessPiece10 = new ChessPiece(9, new ChessPieceShape(Piece.KING, Color.WHITE), new Vector3(1.8, 0.8, 2.3))

export const chessPieces: ChessPiece[] = [ChessPiece1, ChessPiece2, ChessPiece3, ChessPiece4, ChessPiece5, ChessPiece6, ChessPiece7, ChessPiece8, ChessPiece9, ChessPiece10]