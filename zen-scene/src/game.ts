import {createLandscape} from "./modules/landscape";

export const sceneMessageBus = new MessageBus()

//BUILD SCENE

log("THIS IS THE TOP OF THE SCENE")

const _scene = new Entity('_scene')
engine.addEntity(_scene)
let transform = new Transform({
    position: new Vector3(0, 0, 0),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
});
_scene.addComponentOrReplace(transform)

createLandscape(_scene);
