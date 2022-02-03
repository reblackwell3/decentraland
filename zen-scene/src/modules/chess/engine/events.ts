import {sceneMessageBus} from "../../game-int";
import {PieceDetails} from "./piece/piece";

function EventHandler() {

}

export const handler = new EventHandler()


sceneMessageBus.on("ChessPieceSelected", (details: PieceDetails) => {
    handler.getPiece(details.id).getComponent(Transform).position.set(details.position.x, details.position.y, details.position.z)
})

sceneMessageBus.on("ChessPieceMoved", (details: PieceDetails) => {
    handler.getPiece(details.id).getComponent(Transform).rotation.set(0, 0, 0, 1)
    handler.getPiece(details.id).getComponent(Transform).position.set(details.position.x, details.position.y, details.position.z)
})
