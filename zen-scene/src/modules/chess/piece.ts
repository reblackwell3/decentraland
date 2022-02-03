import {GameDetail, GameObject} from "../game-int";

//There may need to be an enum that makes selection of the appearance/animations/etc
//easy if there are multiple to choose from
//so multiple classes with an enum to choose the class
export class PieceAppearance implements GameDetail {
    apply() {
    }

}

export class PieceAnimations implements GameDetail {
    apply() {
    }

}

export class PieceActions implements GameDetail {
    apply() {
    }

}

export type PieceState = {

}

export class Piece extends GameObject {

}

//There will be a builder that will build this