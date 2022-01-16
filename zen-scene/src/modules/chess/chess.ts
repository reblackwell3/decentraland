// NOTE: We're matching the beer object's position in the array with the id - this is not good
import {ChessPiece, ChessPieceShape, Piece, PieceColor} from "./piece";
import {BoardColor, ChessBoard} from "./board";
import {sceneMessageBus} from "../../game";

// PIECES

const ChessPiece1 = new ChessPiece(0, new ChessPieceShape(Piece.PAWN, PieceColor.WHITE), new Vector3(8.3, 1.25, 8))
const ChessPiece2 = new ChessPiece(1, new ChessPieceShape(Piece.PAWN, PieceColor.WHITE), new Vector3(7.8, 1.25, 8.3))
const ChessPiece3 = new ChessPiece(2, new ChessPieceShape(Piece.PAWN, PieceColor.WHITE), new Vector3(1.86, 0.8, 13.4))
const ChessPiece4 = new ChessPiece(3, new ChessPieceShape(Piece.BISHOP, PieceColor.BLACK), new Vector3(2.3, 0.8, 14))
const ChessPiece5 = new ChessPiece(4, new ChessPieceShape(Piece.BISHOP, PieceColor.WHITE), new Vector3(13.7, 0.8, 13.8))
const ChessPiece6 = new ChessPiece(5, new ChessPieceShape(Piece.PAWN, PieceColor.BLACK), new Vector3(13.9, 0.8, 14.3))
const ChessPiece7 = new ChessPiece(6, new ChessPieceShape(Piece.PAWN, PieceColor.WHITE), new Vector3(14.5, 0.8, 2.5))
const ChessPiece8 = new ChessPiece(7, new ChessPieceShape(Piece.PAWN, PieceColor.WHITE), new Vector3(13.7, 0.8, 1.9))
const ChessPiece9 = new ChessPiece(8, new ChessPieceShape(Piece.QUEEN, PieceColor.WHITE), new Vector3(2.4, 0.8, 1.5))
const ChessPiece10 = new ChessPiece(9, new ChessPieceShape(Piece.KING, PieceColor.WHITE), new Vector3(1.8, 0.8, 2.3))

export const chessPieces: ChessPiece[] = [ChessPiece1, ChessPiece2, ChessPiece3, ChessPiece4, ChessPiece5, ChessPiece6, ChessPiece7, ChessPiece8, ChessPiece9, ChessPiece10]

// Multiplayer
type ChessPieceState = {
    id: number,
    position: Vector3
}

sceneMessageBus.on("ChessPieceSelected", (state: ChessPieceState) => {
    chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z)
})

sceneMessageBus.on("ChessPieceMoved", (state: ChessPieceState) => {
    chessPieces[state.id].getComponent(Transform).rotation.set(0, 0, 0, 1)
    chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z)
})

// BOARDS

function createChessBoard(id: number, color: BoardColor, transform: Transform) {
    let board = new ChessBoard(id, color)
    board.addComponentOrReplace(transform)
    engine.addEntity(board)
    return board
}

const board1 = createChessBoard(1, BoardColor.BLACK, new Transform({
    position: new Vector3(3, .15, 5),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
}));

const board2 = createChessBoard(2, BoardColor.BLACK, new Transform({
    position: new Vector3(4, .15, 13),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
}))
const board3 = createChessBoard(3, BoardColor.BROWN, new Transform({
    position: new Vector3(13.5, .15, 6.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(.5, .5, .5)
}))

export const chessBoards: ChessBoard[] = [board1, board2, board3]