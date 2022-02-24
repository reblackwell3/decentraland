import {createLandscape} from "./modules/landscape";
import {BoardController} from "./modules/chess/board/controller";
import {BoardModel} from "./modules/chess/board/model";
import {BoardView} from "./modules/chess/board/view";

export const sceneMessageBus = new MessageBus()

//BUILD SCENE

log("THIS IS THE TOP OF THE SCENE")

const _scene = new Entity('_scene')
engine.addEntity(_scene)
_scene.addComponentOrReplace(SCENE_TRANS)

createLandscape(_scene);

const boardModel = new BoardModel();
const boardView = new BoardView(SCENE_TRANS);
const boardController = new BoardController(boardModel, boardView)