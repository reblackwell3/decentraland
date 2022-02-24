//BUILD LANDSCAPE

import {B_GRASS_SHAPE, B_ROCK_SHAPE, GS_TREE_SHAPE, POND_SHAPE, ROCK_ARCH_SHAPE} from "./shape";

export function createEntity(
    _scene: Entity,
    name: string,
    shape: Shape,
    trans: Transform) {
    let e = new Entity(name);
    engine.addEntity(e)
    e.addComponent(trans)
    e.addComponent(shape)
    e.setParent(_scene)
    return e
}

export function createLandscape(_scene:Entity) {
    const greenSycamoreTree3 = createEntity(
        _scene,
        'greenSycamoreTree3',
        GS_TREE_SHAPE,
        GST_3_TRANS
    )

    const bermudaGrass = createEntity(
        _scene,
        'bermudaGrass',
        B_GRASS_SHAPE,
        BG_TRANS
    )

    const greenSycamoreTree = createEntity(
        _scene,
        'greenSycamoreTree',
        GS_TREE_SHAPE,
        GST_TRANS
    )

    const beachRock = createEntity(
        _scene,
        'beachRock',
        B_ROCK_SHAPE,
        BR_TRANS
    )

    const pond = createEntity(
        _scene,
        'pond',
        POND_SHAPE,
        POND_TRANS
    )

    const rockArch = createEntity(
        _scene,
        'rockArch',
        ROCK_ARCH_SHAPE,
        RA_TRANS)
}