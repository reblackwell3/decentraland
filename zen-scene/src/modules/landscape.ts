//BUILD LANDSCAPE

import {B_GRASS_SHAPE, B_ROCK_SHAPE, GS_TREE_SHAPE, POND_SHAPE, ROCK_ARCH_SHAPE} from "./shape";

function createEntity(name: string, shape: Shape, trans: Transform) {
    let entity = new Entity(name);
    engine.addEntity(entity)
    greenSycamoreTree3.addComponentOrReplace(trans)
    greenSycamoreTree3.addComponentOrReplace(shape)
    return entity
}

const greenSycamoreTree3 = createEntity(
    'greenSycamoreTree3',
    GS_TREE_SHAPE,
    GST_3_TRANS
)

const bermudaGrass = createEntity(
    'bermudaGrass',
    B_GRASS_SHAPE,
    BG_TRANS
)

const greenSycamoreTree = createEntity(
    'greenSycamoreTree',
    GS_TREE_SHAPE,
    GST_TRANS
)

const beachRock = createEntity(
    'beachRock',
    B_ROCK_SHAPE,
    BR_TRANS
)

const pond = createEntity(
    'pond',
    POND_SHAPE,
    POND_TRANS
)

const rockArch = createEntity(
    'rockArch',
    ROCK_ARCH_SHAPE,
    RA_TRANS)