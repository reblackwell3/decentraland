import { NormalGLTFShape } from "./modules/shape";
import { chessPieces } from "./modules/chess";

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

  //BUILD LANDSCAPE

  const greenSycamoreTree3 = new Entity('greenSycamoreTree3')
  engine.addEntity(greenSycamoreTree3)
  greenSycamoreTree3.setParent(_scene)
  const transform3 = new Transform({
    position: new Vector3(13.5, 0, 10),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  greenSycamoreTree3.addComponentOrReplace(transform3)
  const gltfShape2 = new NormalGLTFShape("fd4168d3-1040-458d-b90e-fe5f441d593b/TreeSycamore_03/TreeSycamore_03.glb")
  greenSycamoreTree3.addComponentOrReplace(gltfShape2)

  const bermudaGrass = new Entity('bermudaGrass')
  engine.addEntity(bermudaGrass)
  bermudaGrass.setParent(_scene)
  const gltfShape3 = new NormalGLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb")
  bermudaGrass.addComponentOrReplace(gltfShape3)
  const transform4 = new Transform({
    position: new Vector3(8, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  bermudaGrass.addComponentOrReplace(transform4)

  const greenSycamoreTree = new Entity('greenSycamoreTree')
  engine.addEntity(greenSycamoreTree)
  greenSycamoreTree.setParent(_scene)
  const transform7 = new Transform({
    position: new Vector3(9.5, 0, 12),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  greenSycamoreTree.addComponentOrReplace(transform7)
  greenSycamoreTree.addComponentOrReplace(gltfShape2)

  const beachRock = new Entity('beachRock')
  engine.addEntity(beachRock)
  beachRock.setParent(_scene)
  const transform8 = new Transform({
    position: new Vector3(12, 0, 12),
    rotation: new Quaternion(-0.06930860877037048, -0.7037018537521362, -0.5466009378433228, 0.44858384132385254),
    scale: new Vector3(0.5000004172325134, 0.5, 0.5000001192092896)
  })
  beachRock.addComponentOrReplace(transform8)
  const gltfShape4 = new NormalGLTFShape("9c71a19d-783a-4603-a953-b974b484eade/RockBig_01/RockBig_01.glb")
  beachRock.addComponentOrReplace(gltfShape4)

  const pond = new Entity('pond')
  engine.addEntity(pond)
  pond.setParent(_scene)
  const transform9 = new Transform({
    position: new Vector3(8.5, 0, 8),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1, 1, 1)
  })
  pond.addComponentOrReplace(transform9)
  const gltfShape5 = new NormalGLTFShape("2950ca19-cb51-422b-b80e-fc0765d6cf4b/Pond_01/Pond_01.glb")
  pond.addComponentOrReplace(gltfShape5)

  const rockArch = new Entity('rockArch')
  engine.addEntity(rockArch)
  rockArch.setParent(_scene)
  const transform10 = new Transform({
    position: new Vector3(10.5, 0, 1.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(0.7499998807907104, 0.5, 0.7499999403953552)
  })
  rockArch.addComponentOrReplace(transform10)
  const gltfShape6 = new NormalGLTFShape("d77e45df-3850-4bee-8280-d88abf1cf5d9/RockArc_01/RockArc_01.glb")
  rockArch.addComponentOrReplace(gltfShape6)

//BUILD BOARDS

  const blackWhiteBoardShape = new NormalGLTFShape("models/black-white-board.glb")

  const brownBlackBoardShape = new NormalGLTFShape("models/brown-black-board.glb")

  const board1 = new Entity('board1')
  engine.addEntity(board1)
  board1.setParent(_scene)
  board1.addComponentOrReplace(blackWhiteBoardShape)
  const transform2 = new Transform({
    position: new Vector3(3, .15, 5),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
  })
  board1.addComponentOrReplace(transform2)

  const board3 = new Entity('board3')
  engine.addEntity(board3)
  board3.setParent(_scene)
  board3.addComponentOrReplace(blackWhiteBoardShape)
  const transform6 = new Transform({
    position: new Vector3(4, .15, 13),
    rotation: Quaternion.Euler(0, 90, 0),
    scale: new Vector3(.25, .25, .25)
  })
  board3.addComponentOrReplace(transform6)


  //LONER BOARD

  const board2 = new Entity('board2')
  engine.addEntity(board2)
  board2.setParent(_scene)
  board2.addComponentOrReplace(brownBlackBoardShape)
  const transform5 = new Transform({
    position: new Vector3(13.5, .15, 6.5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(.5, .5, .5)
  })
  board2.addComponentOrReplace(transform5)

  //BUILD PIECES

  //SET 1

  const wkGltfShape = new NormalGLTFShape("models/white/king.glb")

  const wk1 = new Entity('wk1')
  engine.addEntity(wk1)
  wk1.setParent(_scene)
  wk1.addComponentOrReplace(wkGltfShape)
  const transformWk = new Transform({
    position: new Vector3(5, 0, 5),
    rotation: new Quaternion(0, 0, 0, 1),
    scale: new Vector3(1.1, 1.1, 1.1)
  })
  wk1.addComponentOrReplace(transformWk)
