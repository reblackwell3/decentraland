import {sceneMessageBus} from "../../game-int";

function EventHandler() {

}

export const handler = new EventHandler()


sceneMessageBus.on("ChessPieceSelected", (id: number) => {
    handler.getPiece(id).getComponent()
})

sceneMessageBus.on("ChessPieceMoved", (id: number, position: Vector3) => {
    handler.getPiece(id).getComponent(Transform).rotation.set(0, 0, 0, 1)
    handler.getPiece(id).getComponent(Transform).position.set(position.x, position.y, position.z)
})
