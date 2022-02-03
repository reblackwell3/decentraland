import {GameDetail, GameObject} from "../game-int";

//There may need to be an enum that makes selection of the appearance/animations/etc
//easy if there are multiple to choose from
//so multiple classes with an enum to choose the class
export class BoardAppearance implements GameDetail {
    apply() {
    }

}

export class BoardAnimations implements GameDetail {
    apply() {
    }

}

export class BoardActions implements GameDetail {
    apply() {
    }

}

export type BoardState = {

}

export class Board extends GameObject {

}

//There will be a builder that will build this