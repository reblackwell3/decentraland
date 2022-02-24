import {createLandscape} from "./modules/landscape";
import {GS_TREE_SHAPE} from "./modules/shape";

export const sceneMessageBus = new MessageBus()

//BUILD SCENE

const _scene = new Entity('_scene')
engine.addEntity(_scene)
_scene.addComponentOrReplace(SCENE_TRANS)

// createLandscape(_scene);

const tree = new Entity('tree')
engine.addEntity(tree)
tree.addComponent(GS_TREE_SHAPE)
tree.addComponent(GST_TRANS)
tree.setParent(_scene)