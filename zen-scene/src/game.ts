import {Player} from "./player";
// import {chessPieces} from "./modules/chess/board/chess-engine";

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
