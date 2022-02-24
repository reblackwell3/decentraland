export class NormalGLTFShape extends GLTFShape {
    constructor(file_name: string) {
        super(file_name);
        this.visible = true
        this.isPointerBlocker = true
        this.withCollisions = true
    }
}

export const BLACK_WHITE_BOARD_SHAPE = new NormalGLTFShape("models/black-white-board.glb");
export const BROWN_BLACK_BOARD_SHAPE = new NormalGLTFShape("models/brown-black-board.glb");

export const GS_TREE_SHAPE = new NormalGLTFShape("fd4168d3-1040-458d-b90e-fe5f441d593b/TreeSycamore_03/TreeSycamore_03.glb")
export const B_GRASS_SHAPE = new NormalGLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb")
export const B_ROCK_SHAPE = new NormalGLTFShape("9c71a19d-783a-4603-a953-b974b484eade/RockBig_01/RockBig_01.glb")
export const POND_SHAPE = new NormalGLTFShape("2950ca19-cb51-422b-b80e-fc0765d6cf4b/Pond_01/Pond_01.glb")
export const ROCK_ARCH_SHAPE = new NormalGLTFShape("d77e45df-3850-4bee-8280-d88abf1cf5d9/RockArc_01/RockArc_01.glb")