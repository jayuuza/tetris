Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE'}));
Mousetrap.bind('space', () => store.dispatch({type: 'DOWN'}));
Mousetrap.bind('left', () => store.dispatch({type: 'LEFT'}));
Mousetrap.bind('right', () => store.dispatch({type: 'RIGHT'}));

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(coord) {
        return new Coord(this.x - 1 + coord.x, this.y - 1 + coord.y)
    }

    compare(coord) {
        return this.x == coord.x && this.y == coord.y;
    }
}

class Piece {
    constructor(shape, rows, cols, offset = new Coord(1, 10)) {
        this.shape = shape;
        this.rows = rows;
        this.cols = cols;
        this.offset = offset;
        this.orientation = 'N';
        this.color = colors.selectRandom();
    }

    points() {
        return this.shape.pointsRotated(this.orientation).map(point => point.add(this.offset));
    }

    maxRow() {
        return Math.max.apply(null, this.points().map(point => point.row));
    }

    maxCol() {
        return Math.max.apply(null, this.points().map(point => point.col));
    }

    minCol() {
        return Math.min.apply(null, this.points().map(point => point.col));
    }

    rotate() {
        this.orientation = Piece.rotations()[(Piece.rotations().indexOf(this.orientation) + 1) % 4];
    }

    unRotate() {
        this.orientation = Piece.rotations()[(Piece.rotations().indexOf(this.orientation) - 1) % 4];
    }

    hasCoord(point) {
        return this.points().some(item => item.compare(point));
    }

    fallOne() {
        this.offset = new Coord(this.offset.row + 1, this.offset.col);
    }

    liftOne() {
        this.offset = new Coord(this.offset.row - 1, this.offset.col);
    }

    left() {
        this.offset = new Coord(this.offset.row, this.offset.col - 1);
    }

    right() {
        this.offset = new Coord(this.offset.row, this.offset.col + 1);
    }

    static rotations() {
        return ['N', 'E', 'S', 'W'];
    }
}

var colors = ["red", "blue", "green", "yellow"]

class Tetromino {
    constructor(name, rotator) {
        this.name = name;
        this.rotator = rotator;
    }

    pointsRotated(rotation) {
        return this.rotator(rotation);
    }
}

var shapes = {
    'O': new Tetromino('O', rotation => [new Coord(1, 1), new Coord(1, 2), new Coord(2, 1), new Coord(2, 2)]),
    'I': new Tetromino('I', rotation => {
        switch (rotation) {
            case 'N':
                return [new Coord(1, 1), new Coord(2, 1), new Coord(3, 1), new Coord(4, 1)];
            case 'E':
                return [new Coord(2, 1), new Coord(2, 2), new Coord(2, 3), new Coord(2, 4)];
            case 'S':
                return [new Coord(1, 1), new Coord(2, 1), new Coord(3, 1), new Coord(4, 1)];
            case 'W':
                return [new Coord(2, 1), new Coord(2, 2), new Coord(2, 3), new Coord(2, 4)];
        }
    }),
    'T': new Tetromino('T', rotation => {
        switch (rotation) {
            case 'N':
                return [new Coord(1, 1), new Coord(1, 2), new Coord(2, 2), new Coord(1, 3)];
            case 'E':
                return [new Coord(1, 2), new Coord(2, 2), new Coord(3, 2), new Coord(2, 1)];
            case 'S':
                return [new Coord(1, 2), new Coord(2, 1), new Coord(2, 2), new Coord(2, 3)];
            case 'W':
                return [new Coord(1, 1), new Coord(2, 1), new Coord(3, 1), new Coord(2, 2)];
        }
    }),
    'L': new Tetromino('L', rotation => {
        switch (rotation) {
            case 'N':
                return [new Coord(1, 1), new Coord(2, 1), new Coord(1, 2), new Coord(1, 3)];
            case 'E':
                return [new Coord(1, 1), new Coord(1, 2), new Coord(2, 2), new Coord(3, 2)];
            case 'S':
                return [new Coord(1, 3), new Coord(2, 1), new Coord(2, 2), new Coord(2, 3)];
            case 'W':
                return [new Coord(1, 1), new Coord(2, 1), new Coord(3, 1), new Coord(3, 2)];

        }
    }),
    'Z': new Tetromino('Z', rotation => {
        switch (rotation) {
            case 'N':
                return [new Coord(1, 1), new Coord(1, 2), new Coord(2, 2), new Coord(2, 3)];
            case 'E':
                return [new Coord(1, 2), new Coord(2, 2), new Coord(2, 1), new Coord(3, 1)];
            case 'S':
                return [new Coord(1, 1), new Coord(1, 2), new Coord(2, 2), new Coord(2, 3)];
            case 'W':
                return [new Coord(1, 2), new Coord(2, 2), new Coord(2, 1), new Coord(3, 1)];
        }
    })
};

colors.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % 4);
    return colors[index];
}

shapes.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % 5);
    return shapes[Object.keys(shapes)[index]];
}
//
// class GameBoard {
//     constructor(rows, columns) {
//         this.rows = rows;
//         this.cols = columns;
//         const initital_board = new Array(rows).fill(null);
//         for (let i = 0; i < rows; i++) {
//             initital_board[i] = new Array(columns).fill("square");
//         }
//         this.squares = initital_board;
//         this.currentPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
//         this.nextPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
//     }
//
//     newPiece() {
//         this.currentPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
//     }
//
//     movePiece(move) {
//         switch (move) {
//             case 'DOWN':
//
//         }
//     }
// }

class GameBoard {
    constructor(rows, columns) {
        this.rows = rows;
        this.cols = columns;
        this.currentPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
        this.nextPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
        this.rubble = [];
    }

    tick() {
        this.transactionDo(() => this.currentPiece.fallOne(), () => this.currentPiece.liftOne());
        if (this.currentPiece.maxRow() == this.rows) {
            this.convertToRubble();
            return this;
        }
        var nextPos = this.currentPiece.points().map(p => new Coord(p.row + 1, p.col));
        if (nextPos.some(p => this.rubble.some(r => r.sameAs(p)))) {
            this.convertToRubble();
        }
        ;
        return this;
    }

    convertToRubble() {
        this.rubble = this.rubble.concat(this.currentPiece.points());
        this.currentPiece = this.nextPiece;
        this.nextPiece = new Piece(shapes.selectRandom(), this.rows, this.cols);
    }

    rotate() {
        this.transactionDo(() => this.currentPiece.rotate(), () => this.currentPiece.unRotate());
        return this;
    }

    left() {
        this.transactionDo(() => this.currentPiece.left(), () => this.currentPiece.right());
        return this;
    }

    right() {
        this.transactionDo(() => this.currentPiece.right(), () => this.currentPiece.left());
        return this;
    }

    currentPieceIsOutOfBounds() {
        return this.currentPiece.minCol() < 1 ||
            this.currentPiece.maxCol() > this.cols ||
            this.currentPiece.maxRow() > this.rows;
    }

    currentPieceOverlapsRubble() {
        return this.currentPiece.points().some(p => this.rubble.some(r => r.sameAs(p)));
    }

    transactionDo(thing, compensation) {
        thing();
        if (this.currentPieceIsOutOfBounds() || this.currentPieceOverlapsRubble()) {
            compensation();
        }
    }
}

const initialGameState = {
    "board": new GameBoard(25, 10),
    "time": 0,
    "score": 0,
}

const gamewatch = (state = initialGameState, action) => {
    switch (action.type) {
        case 'RESET_TIMER':
            return {
                ...state,
                "time": 0,
            };
        case 'STOP_TIMER':
            return {
                ...state,
                "time": state.time,
            };
        case 'TIME_INCREMENT':
            state = state.board.tick();
            // setTimeout(() => store.dispatch({ type: 'TICK' }),500);
            return {
                ...state,
                "time": state.time + 1,
            };
        case 'DROP':
            return {
                ...state,
                "time": state.time + 1,
            };
        case 'LEFT':
            return {
                ...state,
                "time": state.time + 1,
            };
        case 'RIGHT':
            return {
                ...state,
                "time": state.time + 1,
            };
        case 'ROTATE':
            return {
                ...state,
                "time": state.time + 1,
            };
        case 'DECREMENT_TIMER':
            return {
                ...state,
                "time": state.time - 1,
            };
        default:
            return state;
    }
}

const store = Redux.createStore(gamewatch);

store.subscribe(() => {game.setState({game_state: store.getState()})});

function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}

function GetFormattedTime(totalSeconds) {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds - minutes * 60;
    var hours = Math.floor(totalSeconds / 3600);
    var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
    return finalTime;
}


function Square(props) {
    return (
        <button className={props.value}>
        </button>
    );
}

class Board extends React.Component {
    rows() {
        const rows = this.props.gameState.board.rows;
        const cols = this.props.gameState.board.cols;
        const rubble = this.props.gameState.board.rubble;
        const currentPiece = this.props.gameState.board.currentPiece;
        const board = new Array(rows).fill(null);
        for (let i = 0; i < rows; i++) {
            board[i] = new Array(cols).fill("square");
        };

        return board.map(function (key, index) {
            var row = key.map(function (key2) {
                return <Square className={key2} value={key2}/>;
            });
            return <div value={index} className="board-row">{row}</div>
        });
    }


    render() {
        return (
            <div>
                {this.rows()}
            </div>
        );
    }
}

class ShapePreview extends React.Component {
    constructor(props) {
        super();
        var y_bounds = 0;
        var x_bounds = 0;
        const shape = props.shape;
        var points = shape.shape.rotator(shape.orientation);
        for (var i = 0; i < 4; i++) {
            if (points[i].x > x_bounds) {
                x_bounds = points[i].x;
            }
            if (points[i].y > y_bounds) {
                y_bounds = points[i].y;
            }
        }

        var prev = new Array(x_bounds).fill(null);
        for (var i = 0; i < x_bounds; i++) {
            prev[i] = new Array(y_bounds).fill("square");
        }

        for (var i = 0; i < 4; i++) {
            var x = points[i].x;
            var y = points[i].y;
            prev[x - 1][y - 1] = "square " + shape.color;
        }

        this.state = {
            preview: prev
        };
    }

    rows() {
        return this.state.preview.map(function (key, index) {
            var row = key.map(function (key2) {
                return <Square className={key2} value={key2}/>;
            });
            return <div value={index} className="board-row">{row}</div>
        });
    }

    render() {
        return (
            <div className="row">
                <p>{this.props.name}: </p><br/>
                {this.rows()}
                <br/>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            game_state: store.getState(),
        };
    }

    startTimer() {
        this.interval = setInterval(() => store.dispatch({type: 'TIME_INCREMENT'}), 1000);
    }

    pauseTimer() {
        clearInterval(this.interval);
    }

    resetTimer() {
        store.dispatch({type: 'RESET_TIMER'});
        clearInterval(this.interval);
    }

    render() {
        const score = this.state.game_state.score;
        const time = this.state.game_state.time;
        const current_shape = this.state.game_state.board.currentPiece;
        const next_shape = this.state.game_state.board.nextPiece;
        const gameState = this.state.game_state;
        return (
            <div className="game">
                <div className="game-board">
                    <Board gameState={gameState}/>
                </div>
                <div className="game-info">
                    <div> Score: {score} </div>
                    <a href="#" onClick={() => this.startTimer()}> Play </a><br/>
                    <a href="#" onClick={() => this.pauseTimer()}> Pause </a><br/>
                    <a href="#" onClick={() => this.resetTimer()}> Reset </a><br/>
                    <div> Time Elapsed: {GetFormattedTime(time)} </div>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                    <div className="piece-preview">
                        <ShapePreview name="Current shape"  shape={current_shape}/>
                        <ShapePreview name="Next shape"  shape={next_shape}/>
                    </div>
                </div>


            </div>
        );
    }
}
