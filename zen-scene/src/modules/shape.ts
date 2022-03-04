export class NormalGLTFShape extends GLTFShape {
    constructor(file_name: string) {
        super(file_name);
        this.visible = true
        this.isPointerBlocker = true
        this.withCollisions = true
    }
}

export const BLACK_WHITE_BOARD_SHAPE = new NormalGLTFShape("models/black-white-board.glb");
