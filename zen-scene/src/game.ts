import {Player} from "./player";
import {chessPieces} from "./modules/chess/chess";

export const sceneMessageBus = new MessageBus()

const normalTransform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
})

//BUILD SCENE

const _scene = new Entity('_scene')
engine.addEntity(_scene)
_scene.addComponentOrReplace(normalTransform)


// INPUT

// Instance the input object
const input = Input.instance

input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, (event) => {
    if (Player.holdingPiece && event.hit) {
        for (let i = 0; i < chessPieces.length; i++) {
            if (chessPieces[i].getParent()?.alive) { chessPieces[i].putDown(i, event.hit.hitPoint) }
        }
    }
})