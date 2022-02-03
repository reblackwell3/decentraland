import {BoardColor, ChessBoard} from "./board/board";
import {ChessPiece, ChessPieceShape, PieceRank, PieceColor} from "./piece/piece";
import {GameBuilder} from "../game-int";

export class ChessBuilder extends GameBuilder {
    static pieces: ChessPiece[]
    static boards: ChessBoard[]
    constructor() {
        super()
    }
}
// PIECES

const ChessPiece1 = new ChessPiece(0, new ChessPieceShape(PieceRank.PAWN, PieceColor.WHITE), new Vector3(8.3, 1.25, 8))
const ChessPiece2 = new ChessPiece(1, new ChessPieceShape(PieceRank.PAWN, PieceColor.WHITE), new Vector3(7.8, 1.25, 8.3))
const ChessPiece3 = new ChessPiece(2, new ChessPieceShape(PieceRank.PAWN, PieceColor.WHITE), new Vector3(1.86, 0.8, 13.4))
const ChessPiece4 = new ChessPiece(3, new ChessPieceShape(PieceRank.BISHOP, PieceColor.BLACK), new Vector3(2.3, 0.8, 14))
const ChessPiece5 = new ChessPiece(4, new ChessPieceShape(PieceRank.BISHOP, PieceColor.WHITE), new Vector3(13.7, 0.8, 13.8))
const ChessPiece6 = new ChessPiece(5, new ChessPieceShape(PieceRank.PAWN, PieceColor.BLACK), new Vector3(13.9, 0.8, 14.3))
const ChessPiece7 = new ChessPiece(6, new ChessPieceShape(PieceRank.PAWN, PieceColor.WHITE), new Vector3(14.5, 0.8, 2.5))
const ChessPiece8 = new ChessPiece(7, new ChessPieceShape(PieceRank.PAWN, PieceColor.WHITE), new Vector3(13.7, 0.8, 1.9))
const ChessPiece9 = new ChessPiece(8, new ChessPieceShape(PieceRank.QUEEN, PieceColor.WHITE), new Vector3(2.4, 0.8, 1.5))
const ChessPiece10 = new ChessPiece(9, new ChessPieceShape(PieceRank.KING, PieceColor.WHITE), new Vector3(1.8, 0.8, 2.3))

ChessBuilder.pieces.push(
    ChessPiece1,
    ChessPiece2,
    ChessPiece3,
    ChessPiece4,
    ChessPiece5,
    ChessPiece6,
    ChessPiece7,
    ChessPiece8,
    ChessPiece9,
    ChessPiece10
)

function createChessBoard(id: number, color: BoardColor, transform: Transform) {
    let board = new ChessBoard(id, color)
    board.addComponentOrReplace(transform)
    engine.addEntity(board)
    return board
}

const BOARD_1_STARTING_TRANSFORM = new Transform({
    position: new Vector3(3, .15, 5),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
});
const board1 = createChessBoard(1, BoardColor.BLACK, BOARD_1_STARTING_TRANSFORM);

const BOARD_2_STARTING_TRANSFORM = new Transform({
    position: new Vector3(4, .15, 13),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
});
const board2 = createChessBoard(2, BoardColor.BLACK, BOARD_2_STARTING_TRANSFORM)

const BOARD_3_STARTING_TRANSFORM = new Transform({
    position: new Vector3(13.5, .15, 6.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(.5, .5, .5)
});
const board3 = createChessBoard(3, BoardColor.BROWN, BOARD_3_STARTING_TRANSFORM)

ChessBuilder.boards.push(
    board1,
    board2,
    board3
)