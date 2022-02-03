var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("player", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Player = void 0;
    var Player = /** @class */ (function () {
        function Player() {
        }
        Player.selectedPieceId = null;
        return Player;
    }());
    exports.Player = Player;
});
define("modules/shape", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NormalGLTFShape = void 0;
    var NormalGLTFShape = /** @class */ (function (_super) {
        __extends(NormalGLTFShape, _super);
        function NormalGLTFShape(file_name) {
            var _this = _super.call(this, file_name) || this;
            _this.visible = true;
            _this.isPointerBlocker = true;
            _this.withCollisions = true;
            return _this;
        }
        return NormalGLTFShape;
    }(GLTFShape));
    exports.NormalGLTFShape = NormalGLTFShape;
});
define("modules/sound", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sound = void 0;
    var Sound = /** @class */ (function (_super) {
        __extends(Sound, _super);
        function Sound(audio, loop, transform) {
            if (loop === void 0) { loop = false; }
            var _this = _super.call(this) || this;
            engine.addEntity(_this);
            _this.addComponent(new AudioSource(audio));
            _this.getComponent(AudioSource).loop = loop;
            _this.addComponent(new Transform());
            if (transform) {
                _this.getComponent(Transform).position = transform;
            }
            else {
                _this.getComponent(Transform).position = Camera.instance.position;
            }
            return _this;
        }
        Sound.prototype.playAudioOnceAtPosition = function (transform) {
            this.getComponent(Transform).position = transform;
            this.getComponent(AudioSource).playOnce();
        };
        Sound.prototype.playAudioAtPosition = function (transform) {
            this.getComponent(Transform).position = transform;
            this.getComponent(AudioSource).playing = true;
        };
        return Sound;
    }(Entity));
    exports.Sound = Sound;
});
//BUILD BOARDS
define("modules/chess/board", ["require", "exports", "modules/shape"], function (require, exports, shape_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChessBoard = exports.Square = exports.BoardColor = void 0;
    var blackWhiteBoardShape = new shape_1.NormalGLTFShape("models/black-white-board.glb");
    var brownBlackBoardShape = new shape_1.NormalGLTFShape("models/brown-black-board.glb");
    var BoardColor;
    (function (BoardColor) {
        BoardColor["BLACK"] = "BLACK";
        BoardColor["BROWN"] = "BROWN";
    })(BoardColor = exports.BoardColor || (exports.BoardColor = {}));
    var Square = /** @class */ (function () {
        function Square(x, y) {
            this._coordinates = { x: x, y: y };
        }
        Object.defineProperty(Square.prototype, "coordinates", {
            get: function () {
                return this._coordinates;
            },
            enumerable: false,
            configurable: true
        });
        return Square;
    }());
    exports.Square = Square;
    var ChessBoard = /** @class */ (function (_super) {
        __extends(ChessBoard, _super);
        function ChessBoard(id, color) {
            var _this = _super.call(this) || this;
            _this.id = id;
            var shape = color == BoardColor.BLACK ? blackWhiteBoardShape : brownBlackBoardShape;
            _this.addComponentOrReplace(shape);
            for (var x = 0; x < 8; x++) {
                for (var y = 0; y < 8; y++) {
                    _this._squares.push(new Square(x, y));
                }
            }
            return _this;
        }
        Object.defineProperty(ChessBoard.prototype, "squares", {
            get: function () {
                return this._squares;
            },
            enumerable: false,
            configurable: true
        });
        return ChessBoard;
    }(Entity));
    exports.ChessBoard = ChessBoard;
});
define("modules/chess/piece", ["require", "exports", "modules/shape", "modules/sound", "player", "@dcl/ecs-scene-utils", "game", "modules/chess/board"], function (require, exports, shape_2, sound_1, player_1, utils, game_1, board_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChessPiece = exports.ChessPieceShape = exports.PieceColor = exports.Piece = void 0;
    var Piece;
    (function (Piece) {
        Piece["PAWN"] = "PAWN";
        Piece["ROOK"] = "ROOK";
        Piece["KNIGHT"] = "KNIGHT";
        Piece["BISHOP"] = "BISHOP";
        Piece["QUEEN"] = "QUEEN";
        Piece["KING"] = "KING";
    })(Piece = exports.Piece || (exports.Piece = {}));
    var PieceColor;
    (function (PieceColor) {
        PieceColor["WHITE"] = "WHITE";
        PieceColor["BLACK"] = "BLACK";
    })(PieceColor = exports.PieceColor || (exports.PieceColor = {}));
    var ChessPieceShape = /** @class */ (function (_super) {
        __extends(ChessPieceShape, _super);
        function ChessPieceShape(details) {
            var _this = this;
            var file_name = "models/" + details.color.toLowerCase() + "/" + details.rank.toLowerCase() + ".glb";
            log(file_name);
            _this = _super.call(this, file_name) || this;
            return _this;
        }
        return ChessPieceShape;
    }(shape_2.NormalGLTFShape));
    exports.ChessPieceShape = ChessPieceShape;
    // Sound
    var pickUpSound = new sound_1.Sound(new AudioClip("sounds/pickUp.mp3"));
    var putDownSound = new sound_1.Sound(new AudioClip("sounds/putDown.mp3"));
    var ChessPiece = /** @class */ (function (_super) {
        __extends(ChessPiece, _super);
        function ChessPiece(id, details, position) {
            var _this = _super.call(this) || this;
            _this.id = id;
            engine.addEntity(_this);
            _this.addComponent(new ChessPieceShape(details));
            _this.addComponent(new Transform({ position: position }));
            _this.addComponent(new OnPointerDown(function () {
                _this.selectPiece(_this.id);
            }, {
                button: ActionButton.PRIMARY,
                showFeedback: true,
                hoverText: "pick up",
            }));
            _this.addComponent(new OnPointerDown(function () {
                if (ChessBoard)
                    _this.id;
            }), {
                this: .moveToSquare(player_1.Player.selectedPieceId, player_1.Player.selectedSquare)
            });
            return _this;
        }
        return ChessPiece;
    }(Entity));
    exports.ChessPiece = ChessPiece;
    {
        button: ActionButton.PRIMARY,
            showFeedback;
        true,
            hoverText;
        "pick up",
        ;
    }
    selectPiece(pieceId, number);
    void {
        this: .setParent(null),
        pickUpSound: pickUpSound,
        : .getComponent(AudioSource).playOnce(),
        this: .setParent(Attachable.FIRST_PERSON_CAMERA),
        this: .addComponentOrReplace(new utils.Delay(100, function () {
            player_1.Player.selectedPieceId = pieceId;
        })),
        sceneMessageBus: game_1.sceneMessageBus,
        : .emit("ChessPieceSelected", { id: pieceId })
    };
    moveToSquare(square, board_1.Square);
    void {
        this: .setParent(null),
        putDownSound: putDownSound,
        : .getComponent(AudioSource).playOnce(),
        sceneMessageBus: game_1.sceneMessageBus,
        : .emit("ChessPieceMoved", { id: player_1.Player.selectedPieceId, square: square }),
        Player: player_1.Player,
        : .selectedPieceId = null
    };
    addPointerDown();
    {
        this.addComponent(new OnPointerDown(function () {
            _this.selectPiece(_this.id);
        }, {
            button: ActionButton.PRIMARY,
            showFeedback: true,
            hoverText: "move piece",
        }));
    }
});
define("modules/chess/chess", ["require", "exports", "modules/chess/piece", "modules/chess/board", "game"], function (require, exports, piece_1, board_2, game_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.chessBoards = exports.chessPieces = void 0;
    // PIECES
    var ChessPiece1 = new piece_1.ChessPiece(0, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.WHITE), new Vector3(8.3, 1.25, 8));
    var ChessPiece2 = new piece_1.ChessPiece(1, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.WHITE), new Vector3(7.8, 1.25, 8.3));
    var ChessPiece3 = new piece_1.ChessPiece(2, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.WHITE), new Vector3(1.86, 0.8, 13.4));
    var ChessPiece4 = new piece_1.ChessPiece(3, new piece_1.ChessPieceShape(piece_1.Piece.BISHOP, piece_1.PieceColor.BLACK), new Vector3(2.3, 0.8, 14));
    var ChessPiece5 = new piece_1.ChessPiece(4, new piece_1.ChessPieceShape(piece_1.Piece.BISHOP, piece_1.PieceColor.WHITE), new Vector3(13.7, 0.8, 13.8));
    var ChessPiece6 = new piece_1.ChessPiece(5, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.BLACK), new Vector3(13.9, 0.8, 14.3));
    var ChessPiece7 = new piece_1.ChessPiece(6, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.WHITE), new Vector3(14.5, 0.8, 2.5));
    var ChessPiece8 = new piece_1.ChessPiece(7, new piece_1.ChessPieceShape(piece_1.Piece.PAWN, piece_1.PieceColor.WHITE), new Vector3(13.7, 0.8, 1.9));
    var ChessPiece9 = new piece_1.ChessPiece(8, new piece_1.ChessPieceShape(piece_1.Piece.QUEEN, piece_1.PieceColor.WHITE), new Vector3(2.4, 0.8, 1.5));
    var ChessPiece10 = new piece_1.ChessPiece(9, new piece_1.ChessPieceShape(piece_1.Piece.KING, piece_1.PieceColor.WHITE), new Vector3(1.8, 0.8, 2.3));
    exports.chessPieces = [ChessPiece1, ChessPiece2, ChessPiece3, ChessPiece4, ChessPiece5, ChessPiece6, ChessPiece7, ChessPiece8, ChessPiece9, ChessPiece10];
    game_2.sceneMessageBus.on("ChessPieceSelected", function (state) {
        exports.chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z);
    });
    game_2.sceneMessageBus.on("ChessPieceMoved", function (state) {
        exports.chessPieces[state.id].getComponent(Transform).rotation.set(0, 0, 0, 1);
        exports.chessPieces[state.id].getComponent(Transform).position.set(state.position.x, state.position.y, state.position.z);
    });
    // BOARDS
    function createChessBoard(id, color, transform) {
        var board = new board_2.ChessBoard(id, color);
        board.addComponentOrReplace(transform);
        engine.addEntity(board);
        return board;
    }
    var board1 = createChessBoard(1, board_2.BoardColor.BLACK, new Transform({
        position: new Vector3(3, .15, 5),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(.25, .25, .25)
    }));
    var board2 = createChessBoard(2, board_2.BoardColor.BLACK, new Transform({
        position: new Vector3(4, .15, 13),
        rotation: Quaternion.Euler(0, 90, 0),
        scale: new Vector3(.25, .25, .25)
    }));
    var board3 = createChessBoard(3, board_2.BoardColor.BROWN, new Transform({
        position: new Vector3(13.5, .15, 6.5),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(.5, .5, .5)
    }));
    exports.chessBoards = [board1, board2, board3];
});
define("game-int", ["require", "exports", "player", "modules/chess/chess"], function (require, exports, player_2, chess_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sceneMessageBus = void 0;
    exports.sceneMessageBus = new MessageBus();
    var normalTransform = new Transform({
        position: new Vector3(0, 0, 0),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    });
    //BUILD SCENE
    var _scene = new Entity('_scene');
    engine.addEntity(_scene);
    _scene.addComponentOrReplace(normalTransform);
    // INPUT
    // Instance the input object
    var input = Input.instance;
    input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, function (event) {
        var _a;
        if (player_2.Player.selectedPieceId && event.hit) {
            for (var i = 0; i < chess_1.chessPieces.length; i++) {
                if ((_a = chess_1.chessPieces[i].getParent()) === null || _a === void 0 ? void 0 : _a.alive) {
                    chess_1.chessPieces[i].putDown(i, event.hit.hitPoint);
                }
            }
        }
    });
});
define("modules/boardgame", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardgame = void 0;
    var boardgame = /** @class */ (function (_super) {
        __extends(boardgame, _super);
        function boardgame(id, gameengine, player, state) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.gameengine = gameengine;
            _this.player = player;
            _this.state = state;
            engine.addEntity(_this);
            return _this;
        }
        return boardgame;
    }(Entity));
    exports.boardgame = boardgame;
});
define("modules/boardgame2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boardgame = void 0;
    var boardgame = /** @class */ (function (_super) {
        __extends(boardgame, _super);
        function boardgame(id, gameengine) {
            var _this = _super.call(this) || this;
            _this.id = id;
            _this.gameengine = gameengine;
            engine.addEntity(_this);
            return _this;
        }
        return boardgame;
    }(Entity));
    exports.boardgame = boardgame;
});
//BUILD LANDSCAPE
define("modules/landscape", ["require", "exports", "modules/shape"], function (require, exports, shape_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var greenSycamoreTree3 = new Entity('greenSycamoreTree3');
    engine.addEntity(greenSycamoreTree3);
    var transform3 = new Transform({
        position: new Vector3(13.5, 0, 10),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    });
    greenSycamoreTree3.addComponentOrReplace(transform3);
    var gltfShape2 = new shape_3.NormalGLTFShape("fd4168d3-1040-458d-b90e-fe5f441d593b/TreeSycamore_03/TreeSycamore_03.glb");
    greenSycamoreTree3.addComponentOrReplace(gltfShape2);
    var bermudaGrass = new Entity('bermudaGrass');
    engine.addEntity(bermudaGrass);
    var gltfShape3 = new shape_3.NormalGLTFShape("c9b17021-765c-4d9a-9966-ce93a9c323d1/FloorBaseGrass_01/FloorBaseGrass_01.glb");
    bermudaGrass.addComponentOrReplace(gltfShape3);
    var transform4 = new Transform({
        position: new Vector3(8, 0, 8),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    });
    bermudaGrass.addComponentOrReplace(transform4);
    var greenSycamoreTree = new Entity('greenSycamoreTree');
    engine.addEntity(greenSycamoreTree);
    var transform7 = new Transform({
        position: new Vector3(9.5, 0, 12),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    });
    greenSycamoreTree.addComponentOrReplace(transform7);
    greenSycamoreTree.addComponentOrReplace(gltfShape2);
    var beachRock = new Entity('beachRock');
    engine.addEntity(beachRock);
    var transform8 = new Transform({
        position: new Vector3(12, 0, 12),
        rotation: new Quaternion(-0.06930860877037048, -0.7037018537521362, -0.5466009378433228, 0.44858384132385254),
        scale: new Vector3(0.5000004172325134, 0.5, 0.5000001192092896)
    });
    beachRock.addComponentOrReplace(transform8);
    var gltfShape4 = new shape_3.NormalGLTFShape("9c71a19d-783a-4603-a953-b974b484eade/RockBig_01/RockBig_01.glb");
    beachRock.addComponentOrReplace(gltfShape4);
    var pond = new Entity('pond');
    engine.addEntity(pond);
    var transform9 = new Transform({
        position: new Vector3(8.5, 0, 8),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(1, 1, 1)
    });
    pond.addComponentOrReplace(transform9);
    var gltfShape5 = new shape_3.NormalGLTFShape("2950ca19-cb51-422b-b80e-fc0765d6cf4b/Pond_01/Pond_01.glb");
    pond.addComponentOrReplace(gltfShape5);
    var rockArch = new Entity('rockArch');
    engine.addEntity(rockArch);
    var transform10 = new Transform({
        position: new Vector3(10.5, 0, 1.5),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(0.7499998807907104, 0.5, 0.7499999403953552)
    });
    rockArch.addComponentOrReplace(transform10);
    var gltfShape6 = new shape_3.NormalGLTFShape("d77e45df-3850-4bee-8280-d88abf1cf5d9/RockArc_01/RockArc_01.glb");
    rockArch.addComponentOrReplace(gltfShape6);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wbGF5ZXIudHMiLCIuLi9zcmMvbW9kdWxlcy9zaGFwZS50cyIsIi4uL3NyYy9tb2R1bGVzL3NvdW5kLnRzIiwiLi4vc3JjL21vZHVsZXMvY2hlc3MvYm9hcmQudHMiLCIuLi9zcmMvbW9kdWxlcy9jaGVzcy9waWVjZS50cyIsIi4uL3NyYy9tb2R1bGVzL2NoZXNzL2NoZXNzLnRzIiwiLi4vc3JjL2dhbWUudHMiLCIuLi9zcmMvbW9kdWxlcy9ib2FyZGdhbWUudHMiLCIuLi9zcmMvbW9kdWxlcy9ib2FyZGdhbWUyLnRzIiwiLi4vc3JjL21vZHVsZXMvbGFuZHNjYXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQTtRQUFBO1FBRUEsQ0FBQztRQURVLHNCQUFlLEdBQUcsSUFBSSxDQUFBO1FBQ2pDLGFBQUM7S0FBQSxBQUZELElBRUM7SUFGWSx3QkFBTTs7Ozs7O0lDQW5CO1FBQXFDLG1DQUFTO1FBQzFDLHlCQUFZLFNBQVM7WUFBckIsWUFDSSxrQkFBTSxTQUFTLENBQUMsU0FJbkI7WUFIRyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTtZQUNuQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFBO1lBQzVCLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFBOztRQUM5QixDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBUEQsQ0FBcUMsU0FBUyxHQU83QztJQVBZLDBDQUFlOzs7Ozs7SUNBNUI7UUFBMkIseUJBQU07UUFDN0IsZUFBWSxLQUFnQixFQUFFLElBQXFCLEVBQUUsU0FBbUI7WUFBMUMscUJBQUEsRUFBQSxZQUFxQjtZQUFuRCxZQUNJLGlCQUFPLFNBVVY7WUFURyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxDQUFBO1lBQ3RCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxD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LElBQU0sVUFBVSxHQUFHLElBQUksdUJBQWUsQ0FBQywwREFBMEQsQ0FBQyxDQUFBO0lBQ2xHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUV0QyxJQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFCLElBQU0sV0FBVyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQzlCLFFBQVEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUNuQyxRQUFRLEVBQUUsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUM7S0FDbEUsQ0FBQyxDQUFBO0lBQ0YsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzNDLElBQU0sVUFBVSxHQUFHLElBQUksdUJBQWUsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO0lBQ3hHLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQbGF5ZXIge1xuICAgIHN0YXRpYyBzZWxlY3RlZFBpZWNlSWQgPSBudWxsXG59IiwiZXhwb3J0IGNsYXNzIE5vcm1hbEdMVEZTaGFwZSBleHRlbmRzIEdMVEZTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoZmlsZV9uYW1lKSB7XG4gICAgICAgIHN1cGVyKGZpbGVfbmFtZSk7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWVcbiAgICAgICAgdGhpcy5pc1BvaW50ZXJCbG9ja2VyID0gdHJ1ZVxuICAgICAgICB0aGlzLndpdGhDb2xsaXNpb25zID0gdHJ1ZVxuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgU291bmQgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKGF1ZGlvOiBBdWRpb0NsaXAsIGxvb3A6IGJvb2xlYW4gPSBmYWxzZSwgdHJhbnNmb3JtPzogVmVjdG9yMykge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIGVuZ2luZS5hZGRFbnRpdHkodGhpcylcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnQobmV3IEF1ZGlvU291cmNlKGF1ZGlvKSlcbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoQXVkaW9Tb3VyY2UpLmxvb3AgPSBsb29wXG4gICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KG5ldyBUcmFuc2Zvcm0oKSlcbiAgICAgICAgaWYgKHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVHJhbnNmb3JtKS5wb3NpdGlvbiA9IHRyYW5zZm9ybVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoVHJhbnNmb3JtKS5wb3NpdGlvbiA9IENhbWVyYS5pbnN0YW5jZS5wb3NpdGlvblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheUF1ZGlvT25jZUF0UG9zaXRpb24odHJhbnNmb3JtOiBWZWN0b3IzKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KFRyYW5zZm9ybSkucG9zaXRpb24gPSB0cmFuc2Zvcm1cbiAgICAgICAgdGhpcy5nZXRDb21wb25lbnQoQXVkaW9Tb3VyY2UpLnBsYXlPbmNlKClcbiAgICB9XG5cbiAgICBwbGF5QXVkaW9BdFBvc2l0aW9uKHRyYW5zZm9ybTogVmVjdG9yMyk6IHZvaWQge1xuICAgICAgICB0aGlzLmdldENvbXBvbmVudChUcmFuc2Zvcm0pLnBvc2l0aW9uID0gdHJhbnNmb3JtXG4gICAgICAgIHRoaXMuZ2V0Q29tcG9uZW50KEF1ZGlvU291cmNlKS5wbGF5aW5nID0gdHJ1ZVxuICAgIH1cbn0iLCIvL0JVSUxEIEJPQVJEU1xuXG5pbXBvcnQge05vcm1hbEdMVEZTaGFwZX0gZnJvbSBcIi4uL3NoYXBlXCI7XG5cbmNvbnN0IGJsYWNrV2hpdGVCb2FyZFNoYXBlID0gbmV3IE5vcm1hbEdMVEZTaGFwZShcIm1vZGVscy9ibGFjay13aGl0ZS1ib2FyZC5nbGJcIilcblxuY29uc3QgYnJvd25CbGFja0JvYXJkU2hhcGUgPSBuZXcgTm9ybWFsR0xURlNoYXBlKFwibW9kZWxzL2Jyb3duLWJsYWNrLWJvYXJkLmdsYlwiKVxuXG5leHBvcnQgZW51bSBCb2FyZENvbG9yIHtcbiAgICBCTEFDSz0gXCJCTEFDS1wiLCBCUk9XTj0gXCJCUk9XTlwiLFxufVxuXG5leHBvcnQgdHlwZSBCb2FyZENvb3JkaW5hdGVzID0ge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIFNxdWFyZSB7XG4gICAgcHJpdmF0ZSBfY29vcmRpbmF0ZXM6IEJvYXJkQ29vcmRpbmF0ZXNcblxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2Nvb3JkaW5hdGVzID0ge3gsIHl9XG4gICAgfVxuXG4gICAgZ2V0IGNvb3JkaW5hdGVzKCk6IEJvYXJkQ29vcmRpbmF0ZXMge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29vcmRpbmF0ZXM7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEVudGl0eSB7XG5cbiAgICBnZXQgc3F1YXJlcygpOiBTcXVhcmVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcXVhcmVzO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NxdWFyZXM6IFNxdWFyZVtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIGNvbG9yOiBCb2FyZENvbG9yKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgbGV0IHNoYXBlIDogTm9ybWFsR0xURlNoYXBlID0gY29sb3IgPT0gQm9hcmRDb2xvci5CTEFDSyA/IGJsYWNrV2hpdGVCb2FyZFNoYXBlIDogYnJvd25CbGFja0JvYXJkU2hhcGVcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnRPclJlcGxhY2Uoc2hhcGUpXG5cbiAgICAgICAgZm9yIChsZXQgeD0wOyB4PDg7IHgrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCA4OyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcXVhcmVzLnB1c2gobmV3IFNxdWFyZSh4LHkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSIsImltcG9ydCB7Tm9ybWFsR0xURlNoYXBlfSBmcm9tIFwiLi4vc2hhcGVcIjtcbmltcG9ydCB7U291bmR9IGZyb20gXCIuLi9zb3VuZFwiO1xuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLi8uLi9wbGF5ZXJcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJAZGNsL2Vjcy1zY2VuZS11dGlsc1wiO1xuaW1wb3J0IHtzY2VuZU1lc3NhZ2VCdXN9IGZyb20gXCIuLi8uLi9nYW1lXCI7XG5pbXBvcnQge1NxdWFyZX0gZnJvbSBcIi4vYm9hcmRcIjtcblxuZXhwb3J0IGVudW0gUGllY2Uge1xuICAgIFBBV049IFwiUEFXTlwiLCBST09LPSBcIlJPT0tcIiwgS05JR0hUPSBcIktOSUdIVFwiLCBCSVNIT1A9IFwiQklTSE9QXCIsIFFVRUVOPSBcIlFVRUVOXCIsIEtJTkc9IFwiS0lOR1wiXG59XG5cbmV4cG9ydCBlbnVtIFBpZWNlQ29sb3Ige1xuICAgIFdISVRFPSBcIldISVRFXCIsIEJMQUNLPSBcIkJMQUNLXCJcbn1cblxuZXhwb3J0IHR5cGUgUGllY2VEZXRhaWxzID0ge1xuICAgIHJhbms6IFBpZWNlLFxuICAgIGNvbG9yOiBQaWVjZUNvbG9yXG59XG5cbmV4cG9ydCBjbGFzcyBDaGVzc1BpZWNlU2hhcGUgZXh0ZW5kcyBOb3JtYWxHTFRGU2hhcGUge1xuICAgIGNvbnN0cnVjdG9yKGRldGFpbHM6IFBpZWNlRGV0YWlscykge1xuICAgICAgICBsZXQgZmlsZV9uYW1lID0gYG1vZGVscy8ke2RldGFpbHMuY29sb3IudG9Mb3dlckNhc2UoKX0vJHtkZXRhaWxzLnJhbmsudG9Mb3dlckNhc2UoKX0uZ2xiYFxuICAgICAgICBsb2coZmlsZV9uYW1lKVxuICAgICAgICBzdXBlcihmaWxlX25hbWUpO1xuICAgIH1cbn1cblxuLy8gU291bmRcbmNvbnN0IHBpY2tVcFNvdW5kID0gbmV3IFNvdW5kKG5ldyBBdWRpb0NsaXAoXCJzb3VuZHMvcGlja1VwLm1wM1wiKSlcbmNvbnN0IHB1dERvd25Tb3VuZCA9IG5ldyBTb3VuZChuZXcgQXVkaW9DbGlwKFwic291bmRzL3B1dERvd24ubXAzXCIpKVxuXG5leHBvcnQgY2xhc3MgQ2hlc3NQaWVjZSBleHRlbmRzIEVudGl0eSB7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IG51bWJlciwgZGV0YWlsczogUGllY2VEZXRhaWxzLCBwb3NpdGlvbjogVmVjdG9yMykge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIGVuZ2luZS5hZGRFbnRpdHkodGhpcylcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnQobmV3IENoZXNzUGllY2VTaGFwZShkZXRhaWxzKSlcbiAgICAgICAgdGhpcy5hZGRDb21wb25lbnQobmV3IFRyYW5zZm9ybSh7IHBvc2l0aW9uOiBwb3NpdGlvbiB9KSlcblxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudChcbiAgICAgICAgICAgIG5ldyBPblBvaW50ZXJEb3duKFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0UGllY2UodGhpcy5pZClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiBBY3Rpb25CdXR0b24uUFJJTUFSWSxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ZlZWRiYWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBob3ZlclRleHQ6IFwicGljayB1cFwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuXG4gICAgICAgIHRoaXMuYWRkQ29tcG9uZW50KFxuICAgICAgICAgICAgbmV3IE9uUG9pbnRlckRvd24oXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ2hlc3NCb2FyZCB0aGlzLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb1NxdWFyZShQbGF5ZXIuc2VsZWN0ZWRQaWVjZUlkLCBQbGF5ZXIuc2VsZWN0ZWRTcXVhcmUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uOiBBY3Rpb25CdXR0b24uUFJJTUFSWSxcbiAgICAgICAgICAgICAgICAgICAgc2hvd0ZlZWRiYWNrOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBob3ZlclRleHQ6IFwicGljayB1cFwiLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuXG5cbiAgICB9XG5cbiAgICBwcml2YXRlIHNlbGVjdFBpZWNlKHBpZWNlSWQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNldFBhcmVudChudWxsKVxuICAgICAgICBwaWNrVXBTb3VuZC5nZXRDb21wb25lbnQoQXVkaW9Tb3VyY2UpLnBsYXlPbmNlKClcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQoQXR0YWNoYWJsZS5GSVJTVF9QRVJTT05fQ0FNRVJBKVxuICAgICAgICB0aGlzLmFkZENvbXBvbmVudE9yUmVwbGFjZShcbiAgICAgICAgICAgIG5ldyB1dGlscy5EZWxheSgxMDAsICgpID0+IHtcbiAgICAgICAgICAgICAgICBQbGF5ZXIuc2VsZWN0ZWRQaWVjZUlkID0gcGllY2VJZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICBzY2VuZU1lc3NhZ2VCdXMuZW1pdChcIkNoZXNzUGllY2VTZWxlY3RlZFwiLCB7IGlkOiBwaWVjZUlkIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtb3ZlVG9TcXVhcmUoc3F1YXJlOiBTcXVhcmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQobnVsbClcbiAgICAgICAgcHV0RG93blNvdW5kLmdldENvbXBvbmVudChBdWRpb1NvdXJjZSkucGxheU9uY2UoKVxuICAgICAgICBzY2VuZU1lc3NhZ2VCdXMuZW1pdChcIkNoZXNzUGllY2VNb3ZlZFwiLCB7IGlkOiBQbGF5ZXIuc2VsZWN0ZWRQaWVjZUlkLCBzcXVhcmU6IHNxdWFyZSB9KVxuICAgICAgICBQbGF5ZXIuc2VsZWN0ZWRQaWVjZUlkID0gbnVsbFxuICAgIH1cblxuICAgIGFkZFBvaW50ZXJEb3duKCkge1xuICAgICAgICB0aGlzLmFkZENvbXBvbmVudChcbiAgICAgICAgICAgIG5ldyBPblBvaW50ZXJEb3duKFxuICAgICAgICAgICAgICAgICgpID0+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFBpZWNlKHRoaXMuaWQpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbjogQWN0aW9uQnV0dG9uLlBSSU1BUlksXG4gICAgICAgICAgICAgICAgICAgIHNob3dGZWVkYmFjazogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJUZXh0OiBcIm1vdmUgcGllY2VcIixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59XG4iLCIvLyBOT1RFOiBXZSdyZSBtYXRjaGluZyB0aGUgYmVlciBvYmplY3QncyBwb3NpdGlvbiBpbiB0aGUgYXJyYXkgd2l0aCB0aGUgaWQgLSB0aGlzIGlzIG5vdCBnb29kXG5pbXBvcnQge0NoZXNzUGllY2UsIENoZXNzUGllY2VTaGFwZSwgUGllY2UsIFBpZWNlQ29sb3J9IGZyb20gXCIuL3BpZWNlXCI7XG5pbXBvcnQge0JvYXJkQ29sb3IsIENoZXNzQm9hcmR9IGZyb20gXCIuL2JvYXJkXCI7XG5pbXBvcnQge3NjZW5lTWVzc2FnZUJ1c30gZnJvbSBcIi4uLy4uL2dhbWVcIjtcblxuLy8gUElFQ0VTXG5cbmNvbnN0IENoZXNzUGllY2UxID0gbmV3IENoZXNzUGllY2UoMCwgbmV3IENoZXNzUGllY2VTaGFwZShQaWVjZS5QQVdOLCBQaWVjZUNvbG9yLldISVRFKSwgbmV3IFZlY3RvcjMoOC4zLCAxLjI1LCA4KSlcbmNvbnN0IENoZXNzUGllY2UyID0gbmV3IENoZXNzUGllY2UoMSwgbmV3IENoZXNzUGllY2VTaGFwZShQaWVjZS5QQVdOLCBQaWVjZUNvbG9yLldISVRFKSwgbmV3IFZlY3RvcjMoNy44LCAxLjI1LCA4LjMpKVxuY29uc3QgQ2hlc3NQaWVjZTMgPSBuZXcgQ2hlc3NQaWVjZSgyLCBuZXcgQ2hlc3NQaWVjZVNoYXBlKFBpZWNlLlBBV04sIFBpZWNlQ29sb3IuV0hJVEUpLCBuZXcgVmVjdG9yMygxLjg2LCAwLjgsIDEzLjQpKVxuY29uc3QgQ2hlc3NQaWVjZTQgPSBuZXcgQ2hlc3NQaWVjZSgzLCBuZXcgQ2hlc3NQaWVjZVNoYXBlKFBpZWNlLkJJU0hPUCwgUGllY2VDb2xvci5CTEFDSyksIG5ldyBWZWN0b3IzKDIuMywgMC44LCAxNCkpXG5jb25zdCBDaGVzc1BpZWNlNSA9IG5ldyBDaGVzc1BpZWNlKDQsIG5ldyBDaGVzc1BpZWNlU2hhcGUoUGllY2UuQklTSE9QLCBQaWVjZUNvbG9yLldISVRFKSwgbmV3IFZlY3RvcjMoMTMuNywgMC44LCAxMy44KSlcbmNvbnN0IENoZXNzUGllY2U2ID0gbmV3IENoZXNzUGllY2UoNSwgbmV3IENoZXNzUGllY2VTaGFwZShQaWVjZS5QQVdOLCBQaWVjZUNvbG9yLkJMQUNLKSwgbmV3IFZlY3RvcjMoMTMuOSwgMC44LCAxNC4zKSlcbmNvbnN0IENoZXNzUGllY2U3ID0gbmV3IENoZXNzUGllY2UoNiwgbmV3IENoZXNzUGllY2VTaGFwZShQaWVjZS5QQVdOLCBQaWVjZUNvbG9yLldISVRFKSwgbmV3IFZlY3RvcjMoMTQuNSwgMC44LCAyLjUpKVxuY29uc3QgQ2hlc3NQaWVjZTggPSBuZXcgQ2hlc3NQaWVjZSg3LCBuZXcgQ2hlc3NQaWVjZVNoYXBlKFBpZWNlLlBBV04sIFBpZWNlQ29sb3IuV0hJVEUpLCBuZXcgVmVjdG9yMygxMy43LCAwLjgsIDEuOSkpXG5jb25zdCBDaGVzc1BpZWNlOSA9IG5ldyBDaGVzc1BpZWNlKDgsIG5ldyBDaGVzc1BpZWNlU2hhcGUoUGllY2UuUVVFRU4sIFBpZWNlQ29sb3IuV0hJVEUpLCBuZXcgVmVjdG9yMygyLjQsIDAuOCwgMS41KSlcbmNvbnN0IENoZXNzUGllY2UxMCA9IG5ldyBDaGVzc1BpZWNlKDksIG5ldyBDaGVzc1BpZWNlU2hhcGUoUGllY2UuS0lORywgUGllY2VDb2xvci5XSElURSksIG5ldyBWZWN0b3IzKDEuOCwgMC44LCAyLjMpKVxuXG5leHBvcnQgY29uc3QgY2hlc3NQaWVjZXM6IENoZXNzUGllY2VbXSA9IFtDaGVzc1BpZWNlMSwgQ2hlc3NQaWVjZTIsIENoZXNzUGllY2UzLCBDaGVzc1BpZWNlNCwgQ2hlc3NQaWVjZTUsIENoZXNzUGllY2U2LCBDaGVzc1BpZWNlNywgQ2hlc3NQaWVjZTgsIENoZXNzUGllY2U5LCBDaGVzc1BpZWNlMTBdXG5cbi8vIE11bHRpcGxheWVyXG50eXBlIENoZXNzUGllY2VTdGF0ZSA9IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHBvc2l0aW9uOiBWZWN0b3IzXG59XG5cbnNjZW5lTWVzc2FnZUJ1cy5vbihcIkNoZXNzUGllY2VTZWxlY3RlZFwiLCAoc3RhdGU6IENoZXNzUGllY2VTdGF0ZSkgPT4ge1xuICAgIGNoZXNzUGllY2VzW3N0YXRlLmlkXS5nZXRDb21wb25lbnQoVHJhbnNmb3JtKS5wb3NpdGlvbi5zZXQoc3RhdGUucG9zaXRpb24ueCwgc3RhdGUucG9zaXRpb24ueSwgc3RhdGUucG9zaXRpb24ueilcbn0pXG5cbnNjZW5lTWVzc2FnZUJ1cy5vbihcIkNoZXNzUGllY2VNb3ZlZFwiLCAoc3RhdGU6IENoZXNzUGllY2VTdGF0ZSkgPT4ge1xuICAgIGNoZXNzUGllY2VzW3N0YXRlLmlkXS5nZXRDb21wb25lbnQoVHJhbnNmb3JtKS5yb3RhdGlvbi5zZXQoMCwgMCwgMCwgMSlcbiAgICBjaGVzc1BpZWNlc1tzdGF0ZS5pZF0uZ2V0Q29tcG9uZW50KFRyYW5zZm9ybSkucG9zaXRpb24uc2V0KHN0YXRlLnBvc2l0aW9uLngsIHN0YXRlLnBvc2l0aW9uLnksIHN0YXRlLnBvc2l0aW9uLnopXG59KVxuXG4vLyBCT0FSRFNcblxuZnVuY3Rpb24gY3JlYXRlQ2hlc3NCb2FyZChpZDogbnVtYmVyLCBjb2xvcjogQm9hcmRDb2xvciwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcbiAgICBsZXQgYm9hcmQgPSBuZXcgQ2hlc3NCb2FyZChpZCwgY29sb3IpXG4gICAgYm9hcmQuYWRkQ29tcG9uZW50T3JSZXBsYWNlKHRyYW5zZm9ybSlcbiAgICBlbmdpbmUuYWRkRW50aXR5KGJvYXJkKVxuICAgIHJldHVybiBib2FyZFxufVxuXG5jb25zdCBib2FyZDEgPSBjcmVhdGVDaGVzc0JvYXJkKDEsIEJvYXJkQ29sb3IuQkxBQ0ssIG5ldyBUcmFuc2Zvcm0oe1xuICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMygzLCAuMTUsIDUpLFxuICAgIHJvdGF0aW9uOiBRdWF0ZXJuaW9uLkV1bGVyKDAsIDkwLCAwKSxcbiAgICBzY2FsZTogbmV3IFZlY3RvcjMoLjI1LCAuMjUsIC4yNSlcbn0pKTtcblxuY29uc3QgYm9hcmQyID0gY3JlYXRlQ2hlc3NCb2FyZCgyLCBCb2FyZENvbG9yLkJMQUNLLCBuZXcgVHJhbnNmb3JtKHtcbiAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoNCwgLjE1LCAxMyksXG4gICAgcm90YXRpb246IFF1YXRlcm5pb24uRXVsZXIoMCwgOTAsIDApLFxuICAgIHNjYWxlOiBuZXcgVmVjdG9yMyguMjUsIC4yNSwgLjI1KVxufSkpXG5jb25zdCBib2FyZDMgPSBjcmVhdGVDaGVzc0JvYXJkKDMsIEJvYXJkQ29sb3IuQlJPV04sIG5ldyBUcmFuc2Zvcm0oe1xuICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMygxMy41LCAuMTUsIDYuNSksXG4gICAgcm90YXRpb246IG5ldyBRdWF0ZXJuaW9uKDAsIDAsIDAsIDEpLFxuICAgIHNjYWxlOiBuZXcgVmVjdG9yMyguNSwgLjUsIC41KVxufSkpXG5cbmV4cG9ydCBjb25zdCBjaGVzc0JvYXJkczogQ2hlc3NCb2FyZFtdID0gW2JvYXJkMSwgYm9hcmQyLCBib2FyZDNdIiwiaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHtjaGVzc1BpZWNlc30gZnJvbSBcIi4vbW9kdWxlcy9jaGVzcy9jaGVzc1wiO1xuXG5leHBvcnQgY29uc3Qgc2NlbmVNZXNzYWdlQnVzID0gbmV3IE1lc3NhZ2VCdXMoKVxuXG5jb25zdCBub3JtYWxUcmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHtcbiAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMCwgMCwgMCksXG4gICAgcm90YXRpb246IG5ldyBRdWF0ZXJuaW9uKDAsIDAsIDAsIDEpLFxuICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKVxufSlcblxuLy9CVUlMRCBTQ0VORVxuXG5jb25zdCBfc2NlbmUgPSBuZXcgRW50aXR5KCdfc2NlbmUnKVxuZW5naW5lLmFkZEVudGl0eShfc2NlbmUpXG5fc2NlbmUuYWRkQ29tcG9uZW50T3JSZXBsYWNlKG5vcm1hbFRyYW5zZm9ybSlcblxuXG4vLyBJTlBVVFxuXG4vLyBJbnN0YW5jZSB0aGUgaW5wdXQgb2JqZWN0XG5jb25zdCBpbnB1dCA9IElucHV0Lmluc3RhbmNlXG5cbmlucHV0LnN1YnNjcmliZShcIkJVVFRPTl9ET1dOXCIsIEFjdGlvbkJ1dHRvbi5QUklNQVJZLCB0cnVlLCAoZXZlbnQpID0+IHtcbiAgICBpZiAoUGxheWVyLnNlbGVjdGVkUGllY2VJZCAmJiBldmVudC5oaXQpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGVzc1BpZWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNoZXNzUGllY2VzW2ldLmdldFBhcmVudCgpPy5hbGl2ZSkgeyBjaGVzc1BpZWNlc1tpXS5wdXREb3duKGksIGV2ZW50LmhpdC5oaXRQb2ludCkgfVxuICAgICAgICB9XG4gICAgfVxufSkiLCJ0eXBlIGdhbWVzdGF0ZSA9IHtcbiAgICBib2FyZDogYm9hcmQsXG4gICAgcGxheWVyczogcGxheWVyW10sXG4gICAgbW92ZTogbW92ZVxufVxuXG50eXBlIG1vdmUgPSB7XG4gICAgcGllY2U6IHBpZWNlLFxuICAgIHNwb3Q6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgZ2FtZWVuZ2luZSB7XG4gICAgLy8gdHJ1ZSBvciBmYWxzZSwgd2hldGhlciBtb3ZlIGlzIHZhbGlkXG4gICAgZXZhbHVhdGU6IChzdGF0ZTogZ2FtZXN0YXRlKSA9PiBib29sZWFuXG59XG5cbmludGVyZmFjZSBib2FyZCB7XG4gICAgcGllY2VzOiBwaWVjZVtdLFxuICAgIC8vIHJldHVybnMgdGhlIHBpZWNlIG51bWJlciBvciAtMVxuICAgIGhhc1BpZWNlOiAoc3BvdDogbnVtYmVyKSA9PiBudW1iZXIsXG4gICAgLy8gbW92ZXMgdGhlIHBpZWNlIG51bWJlciB0byB0aGUgc3BvdCBudW1iZXJcbiAgICBtb3ZlOiAoc3BvdDogbnVtYmVyLCBwaWVjZTogbnVtYmVyKSA9PiB2b2lkXG59XG5cbmludGVyZmFjZSBwaWVjZSB7XG4gICAgaWQ6IG51bWJlcixcbiAgICBwb3NpdGlvbjogVmVjdG9yMyxcbiAgICAvLyB0aGUgc3F1YXJlL3Nwb3QgbnVtYmVyIG9yIC0xIGlmIG5vdCBvbiB0aGUgYm9hcmRcbiAgICBib2FyZFNwb3Q6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgcGxheWVyIHtcbiAgICBoYXNNb3ZlOiBib29sZWFuLFxuICAgIC8vIGZhbHNlIHVudGlsIHdpbm5lciBpcyBjcm93bmVkXG4gICAgaXNXaW5uZXI6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIGJvYXJkZ2FtZSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGlkOiBudW1iZXIsIHB1YmxpYyBnYW1lZW5naW5lOiBnYW1lZW5naW5lLCBwdWJsaWMgcGxheWVyOiBwbGF5ZXIsIHB1YmxpYyBzdGF0ZTogZ2FtZXN0YXRlKSB7XG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICBlbmdpbmUuYWRkRW50aXR5KHRoaXMpXG4gICAgfVxuXG59IiwiaW50ZXJmYWNlIGdhbWVlbmdpbmUge1xuICAgIGJvYXJkOiBib2FyZCxcbiAgICBwbGF5ZXJzOiBwbGF5ZXJbXSxcbiAgICAvLyB0cnVlIG9yIGZhbHNlLCB3aGV0aGVyIG1vdmUgaXMgdmFsaWRcbiAgICBldmFsdWF0ZTogKG1vdmU6IG1vdmUpID0+IGJvb2xlYW5cbn1cblxudHlwZSBtb3ZlID0ge1xuICAgIHBpZWNlSWQ6IG51bWJlcixcbiAgICBhY3Rpb25JZDogbnVtYmVyLFxuICAgIHNwb3RJZDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBib2FyZCB7XG4gICAgaWQ6IG51bWJlcixcbiAgICBwb3NpdGlvbjogVmVjdG9yMyxcbiAgICBwaWVjZXM6IHBpZWNlW10sXG4gICAgLy8gcmV0dXJucyB0aGUgcGllY2UgbnVtYmVyIG9yIC0xXG4gICAgc3BvdElkVG9QaWVjZUlkOiAsXG4gICAgZXhlY3V0ZU1vdmU6IChtb3ZlOiBtb3ZlKSA9PiB2b2lkXG59XG5cbnR5cGUgcGllY2UgPSB7XG4gICAgaWQ6IG51bWJlcixcbiAgICBwb3NpdGlvbjogVmVjdG9yMyxcbn1cblxudHlwZSBwbGF5ZXIgPSB7XG4gICAgaGFzTW92ZTogYm9vbGVhbixcbiAgICAvLyBmYWxzZSB1bnRpbCB3aW5uZXIgaXMgY3Jvd25lZFxuICAgIGlzV2lubmVyOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBib2FyZGdhbWUgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogbnVtYmVyLCBwdWJsaWMgZ2FtZWVuZ2luZTogZ2FtZWVuZ2luZSkge1xuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgZW5naW5lLmFkZEVudGl0eSh0aGlzKVxuICAgIH1cblxufSIsIi8vQlVJTEQgTEFORFNDQVBFXG5cbmltcG9ydCB7Tm9ybWFsR0xURlNoYXBlfSBmcm9tIFwiLi9zaGFwZVwiO1xuXG5jb25zdCBncmVlblN5Y2Ftb3JlVHJlZTMgPSBuZXcgRW50aXR5KCdncmVlblN5Y2Ftb3JlVHJlZTMnKVxuZW5naW5lLmFkZEVudGl0eShncmVlblN5Y2Ftb3JlVHJlZTMpXG5jb25zdCB0cmFuc2Zvcm0zID0gbmV3IFRyYW5zZm9ybSh7XG4gICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDEzLjUsIDAsIDEwKSxcbiAgICByb3RhdGlvbjogbmV3IFF1YXRlcm5pb24oMCwgMCwgMCwgMSksXG4gICAgc2NhbGU6IG5ldyBWZWN0b3IzKDEsIDEsIDEpXG59KVxuZ3JlZW5TeWNhbW9yZVRyZWUzLmFkZENvbXBvbmVudE9yUmVwbGFjZSh0cmFuc2Zvcm0zKVxuY29uc3QgZ2x0ZlNoYXBlMiA9IG5ldyBOb3JtYWxHTFRGU2hhcGUoXCJmZDQxNjhkMy0xMDQwLTQ1OGQtYjkwZS1mZTVmNDQxZDU5M2IvVHJlZVN5Y2Ftb3JlXzAzL1RyZWVTeWNhbW9yZV8wMy5nbGJcIilcbmdyZWVuU3ljYW1vcmVUcmVlMy5hZGRDb21wb25lbnRPclJlcGxhY2UoZ2x0ZlNoYXBlMilcblxuY29uc3QgYmVybXVkYUdyYXNzID0gbmV3IEVudGl0eSgnYmVybXVkYUdyYXNzJylcbmVuZ2luZS5hZGRFbnRpdHkoYmVybXVkYUdyYXNzKVxuY29uc3QgZ2x0ZlNoYXBlMyA9IG5ldyBOb3JtYWxHTFRGU2hhcGUoXCJjOWIxNzAyMS03NjVjLTRkOWEtOTk2Ni1jZTkzYTljMzIzZDEvRmxvb3JCYXNlR3Jhc3NfMDEvRmxvb3JCYXNlR3Jhc3NfMDEuZ2xiXCIpXG5iZXJtdWRhR3Jhc3MuYWRkQ29tcG9uZW50T3JSZXBsYWNlKGdsdGZTaGFwZTMpXG5jb25zdCB0cmFuc2Zvcm00ID0gbmV3IFRyYW5zZm9ybSh7XG4gICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKDgsIDAsIDgpLFxuICAgIHJvdGF0aW9uOiBuZXcgUXVhdGVybmlvbigwLCAwLCAwLCAxKSxcbiAgICBzY2FsZTogbmV3IFZlY3RvcjMoMSwgMSwgMSlcbn0pXG5iZXJtdWRhR3Jhc3MuYWRkQ29tcG9uZW50T3JSZXBsYWNlKHRyYW5zZm9ybTQpXG5cbmNvbnN0IGdyZWVuU3ljYW1vcmVUcmVlID0gbmV3IEVudGl0eSgnZ3JlZW5TeWNhbW9yZVRyZWUnKVxuZW5naW5lLmFkZEVudGl0eShncmVlblN5Y2Ftb3JlVHJlZSlcbmNvbnN0IHRyYW5zZm9ybTcgPSBuZXcgVHJhbnNmb3JtKHtcbiAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoOS41LCAwLCAxMiksXG4gICAgcm90YXRpb246IG5ldyBRdWF0ZXJuaW9uKDAsIDAsIDAsIDEpLFxuICAgIHNjYWxlOiBuZXcgVmVjdG9yMygxLCAxLCAxKVxufSlcbmdyZWVuU3ljYW1vcmVUcmVlLmFkZENvbXBvbmVudE9yUmVwbGFjZSh0cmFuc2Zvcm03KVxuZ3JlZW5TeWNhbW9yZVRyZWUuYWRkQ29tcG9uZW50T3JSZXBsYWNlKGdsdGZTaGFwZTIpXG5cbmNvbnN0IGJlYWNoUm9jayA9IG5ldyBFbnRpdHkoJ2JlYWNoUm9jaycpXG5lbmdpbmUuYWRkRW50aXR5KGJlYWNoUm9jaylcbmNvbnN0IHRyYW5zZm9ybTggPSBuZXcgVHJhbnNmb3JtKHtcbiAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMTIsIDAsIDEyKSxcbiAgICByb3RhdGlvbjogbmV3IFF1YXRlcm5pb24oLTAuMDY5MzA4NjA4NzcwMzcwNDgsIC0wLjcwMzcwMTg1Mzc1MjEzNjIsIC0wLjU0NjYwMDkzNzg0MzMyMjgsIDAuNDQ4NTgzODQxMzIzODUyNTQpLFxuICAgIHNjYWxlOiBuZXcgVmVjdG9yMygwLjUwMDAwMDQxNzIzMjUxMzQsIDAuNSwgMC41MDAwMDAxMTkyMDkyODk2KVxufSlcbmJlYWNoUm9jay5hZGRDb21wb25lbnRPclJlcGxhY2UodHJhbnNmb3JtOClcbmNvbnN0IGdsdGZTaGFwZTQgPSBuZXcgTm9ybWFsR0xURlNoYXBlKFwiOWM3MWExOWQtNzgzYS00NjAzLWE5NTMtYjk3NGI0ODRlYWRlL1JvY2tCaWdfMDEvUm9ja0JpZ18wMS5nbGJcIilcbmJlYWNoUm9jay5hZGRDb21wb25lbnRPclJlcGxhY2UoZ2x0ZlNoYXBlNClcblxuY29uc3QgcG9uZCA9IG5ldyBFbnRpdHkoJ3BvbmQnKVxuZW5naW5lLmFkZEVudGl0eShwb25kKVxuY29uc3QgdHJhbnNmb3JtOSA9IG5ldyBUcmFuc2Zvcm0oe1xuICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyg4LjUsIDAsIDgpLFxuICAgIHJvdGF0aW9uOiBuZXcgUXVhdGVybmlvbigwLCAwLCAwLCAxKSxcbiAgICBzY2FsZTogbmV3IFZlY3RvcjMoMSwgMSwgMSlcbn0pXG5wb25kLmFkZENvbXBvbmVudE9yUmVwbGFjZSh0cmFuc2Zvcm05KVxuY29uc3QgZ2x0ZlNoYXBlNSA9IG5ldyBOb3JtYWxHTFRGU2hhcGUoXCIyOTUwY2ExOS1jYjUxLTQyMmItYjgwZS1mYzA3NjVkNmNmNGIvUG9uZF8wMS9Qb25kXzAxLmdsYlwiKVxucG9uZC5hZGRDb21wb25lbnRPclJlcGxhY2UoZ2x0ZlNoYXBlNSlcblxuY29uc3Qgcm9ja0FyY2ggPSBuZXcgRW50aXR5KCdyb2NrQXJjaCcpXG5lbmdpbmUuYWRkRW50aXR5KHJvY2tBcmNoKVxuY29uc3QgdHJhbnNmb3JtMTAgPSBuZXcgVHJhbnNmb3JtKHtcbiAgICBwb3NpdGlvbjogbmV3IFZlY3RvcjMoMTAuNSwgMCwgMS41KSxcbiAgICByb3RhdGlvbjogbmV3IFF1YXRlcm5pb24oMCwgMCwgMCwgMSksXG4gICAgc2NhbGU6IG5ldyBWZWN0b3IzKDAuNzQ5OTk5ODgwNzkwNzEwNCwgMC41LCAwLjc0OTk5OTk0MDM5NTM1NTIpXG59KVxucm9ja0FyY2guYWRkQ29tcG9uZW50T3JSZXBsYWNlKHRyYW5zZm9ybTEwKVxuY29uc3QgZ2x0ZlNoYXBlNiA9IG5ldyBOb3JtYWxHTFRGU2hhcGUoXCJkNzdlNDVkZi0zODUwLTRiZWUtODI4MC1kODhhYmYxY2Y1ZDkvUm9ja0FyY18wMS9Sb2NrQXJjXzAxLmdsYlwiKVxucm9ja0FyY2guYWRkQ29tcG9uZW50T3JSZXBsYWNlKGdsdGZTaGFwZTYpIl19