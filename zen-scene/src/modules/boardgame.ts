type gamestate = {
    board: board,
    players: player[],
    move: move
}

type move = {
    piece: piece,
    spot: number
}

interface gameengine {
    // true or false, whether move is valid
    evaluate: (state: gamestate) => boolean
}

interface board {
    pieces: piece[],
    // returns the piece number or -1
    hasPiece: (spot: number) => number,
    // moves the piece number to the spot number
    move: (spot: number, piece: number) => void
}

interface piece {
    position: Vector3,
    // the square/spot number or -1 if not on the board
    boardSpot: number
}

interface player {
    hasMove: boolean,
    // false until winner is crowned
    isWinner: boolean
}

export class boardgame extends Entity {
    constructor(public id: number, public gameengine: gameengine, public player: player, public state: gamestate) {
        super()

        engine.addEntity(this)
    }

}