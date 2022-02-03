// DETAIL INTERFACE

interface GameDetail {
    apply()
}

// GAME OBJECT

export type GameObjectDetails = {
    appearance: GameDetail,
    animations: GameDetail,
    actions: GameDetail,
    state: any
}

export class GameObject extends Entity {
    private state

    constructor(details: GameObjectDetails) {
        super();
        details.appearance.apply()
        details.animations.apply()
        details.actions.apply()
        this.state = details.state
    }

}

// GAME ENGINE

export class GameEngine {
}

// GAME

export type GameDetails = {
    objects: GameObject[],
    engine: GameEngine,
    state: any
}

export class Game {
    private details: GameDetails

    constructor(details: GameDetails) {
        this.details = details
    }
}

// GAME BUILDER

export class GameBuilder {

}