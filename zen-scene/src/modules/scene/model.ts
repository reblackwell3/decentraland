import {sceneMessageBus} from "../../../game";

import {Chess} from "chess.js";
import {log} from "decentraland-ecs";

// @ts-ignore
const chess = new Chess()

while (!chess.game_over()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
}
log(chess.pgn())