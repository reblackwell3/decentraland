//BUILD LANDSCAPE

import {NormalGLTFShape} from "./shape";

export function createLandscape(_scene: Entity) {
    log("CREATING LANDSCAPE")
    const greenSycamoreTree3 = new Entity('greenSycamoreTree3');
    greenSycamoreTree3.addComponent(new NormalGLTFShape("fd4168d3-1040-458d-b90e-fe5f441d593b/TreeSycamore_03/TreeSycamore_03.glb"))
    greenSycamoreTree3.addComponent(new Transform({
        position: new Vector3(13.5, 0, 10),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    }))
    greenSycamoreTree3.setParent(_scene)


    const bermudaGrass = new Entity('bermudaGrass');
    bermudaGrass.addComponent(new NormalGLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb"))
    bermudaGrass.addComponent(new Transform({
        position: new Vector3(8, 0, 8),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    }))
    bermudaGrass.setParent(_scene)


    const greenSycamoreTree = new Entity('greenSycamoreTree');
    greenSycamoreTree.addComponent(new NormalGLTFShape("fd4168d3-1040-458d-b90e-fe5f441d593b/TreeSycamore_03/TreeSycamore_03.glb"))
    greenSycamoreTree.addComponent(new Transform({
        position: new Vector3(9.5, 0, 12),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    }))
    greenSycamoreTree.setParent(_scene)


    const beachRock = new Entity('beachRock');
    beachRock.addComponent(new NormalGLTFShape("9c71a19d-783a-4603-a953-b974b484eade/RockBig_01/RockBig_01.glb"))
    beachRock.addComponent(new Transform({
        position: new Vector3(12, 0, 12),
        rotation: new Quaternion(-0.06930860877037048, -0.7037018537521362, -0.5466009378433228, 0.44858384132385254),
        scale: new Vector3(0.5000004172325134, 0.5, 0.5000001192092896)
    }))
    beachRock.setParent(_scene)

    const pond = new Entity('pond');
    pond.addComponent(new NormalGLTFShape("2950ca19-cb51-422b-b80e-fc0765d6cf4b/Pond_01/Pond_01.glb"))
    pond.addComponent(new Transform({
        position: new Vector3(8.5, 0, 8),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    }))
    pond.setParent(_scene)

    const rockArch = new Entity('rockArch');
    rockArch.addComponent(new NormalGLTFShape("d77e45df-3850-4bee-8280-d88abf1cf5d9/RockArc_01/RockArc_01.glb"))
    rockArch.addComponent(new Transform({
        position: new Vector3(10.5, 0, 1.5),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(0.7499998807907104, 0.5, 0.7499999403953552)
    }))
    rockArch.setParent(_scene)
}
