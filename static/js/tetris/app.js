Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE_RIGHT'}));
Mousetrap.bind('down', () => store.dispatch({type: 'DOWN'}));
// Mousetrap.bind('down', () => store.dispatch({type: 'ROTATE_LEFT'}));
Mousetrap.bind('space', () => store.dispatch({type: 'DOWN'}));
Mousetrap.bind('left', () => store.dispatch({type: 'LEFT'}));
Mousetrap.bind('right', () => store.dispatch({type: 'RIGHT'}));

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Piece {
    constructor(type, shape, color, orientation, position) {
        this.shape = shape;
        this.type = type;
        this.color = color;
        this.orientation = orientation;
        this.position = position;
    }
}

// var orientations = ["N","E","S","W"]
var colors = ["blue", "green", "red", "yellow"]

colors.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % 4);
    return colors[index];
}

var shapes = {
    'O': {
        'N': [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)],
        'E': [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)],
        'S': [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)],
        'W': [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(2, 2)],
    },
    'L': {
        'N': [new Point(1, 1), new Point(2, 1), new Point(1, 2), new Point(1, 3)],
        'E': [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(3, 2)],
        'S': [new Point(1, 3), new Point(2, 1), new Point(2, 2), new Point(2, 3)],
        'W': [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(3, 2)],
    },
    'R': {
        'S': [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(3, 3)],
        'E': [new Point(1, 1), new Point(1, 2), new Point(2, 1), new Point(3, 1)],
        'N': [new Point(2, 1), new Point(3, 1), new Point(3, 2), new Point(3, 3)],
        'W': [new Point(1, 2), new Point(2, 2), new Point(3, 1), new Point(3, 2)],
    },
    'I': {
        'N': [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(4, 1)],
        'E': [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(2, 4)],
        'S': [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(4, 1)],
        'W': [new Point(2, 1), new Point(2, 2), new Point(2, 3), new Point(2, 4)],
    },
    'Z': {
        'N': [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(2, 3)],
        'E': [new Point(1, 2), new Point(2, 2), new Point(2, 1), new Point(3, 1)],
        'S': [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(2, 3)],
        'W': [new Point(1, 2), new Point(2, 2), new Point(2, 1), new Point(3, 1)],
    },
    'S': {
        'N': [new Point(2, 1), new Point(2, 2), new Point(1, 2), new Point(1, 3)],
        'E': [new Point(1, 1), new Point(2, 1), new Point(2, 2), new Point(3, 2)],
        'S': [new Point(2, 1), new Point(2, 2), new Point(1, 2), new Point(1, 3)],
        'W': [new Point(1, 1), new Point(2, 1), new Point(2, 2), new Point(3, 2)],
    },
    'T': {
        'N': [new Point(1, 1), new Point(1, 2), new Point(2, 2), new Point(1, 3)],
        'E': [new Point(1, 2), new Point(2, 2), new Point(3, 2), new Point(2, 1)],
        'S': [new Point(1, 2), new Point(2, 1), new Point(2, 2), new Point(2, 3)],
        'W': [new Point(1, 1), new Point(2, 1), new Point(3, 1), new Point(2, 2)],
    },
}

shapes.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % 7);
    var index2 = Math.floor(Math.random() * 1000000 % 4);
    var shape = shapes[Object.keys(shapes)[index]];
    return [Object.keys(shapes)[index], shape[Object.keys(shape)[index2]], Object.keys(shape)[index], Object.keys(shape)[index2]];
}

function newPiece() {
    var temp = shapes.selectRandom()
    return new Piece(temp[0], temp[1], colors.selectRandom(), temp[2], new Point(0, 4))
}

class GameBoard {
    constructor(rows, columns) {
        this.rows = rows;
        this.cols = columns;
        this.currentPiece = newPiece();
        this.nextPiece = newPiece();
        const initital_board = new Array(rows).fill(null);
        for (let i = 0; i < rows; i++) {
            initital_board[i] = new Array(columns).fill(-1);
        }
        this.board = initital_board;
        this.score = 0;
    }


    rotateRight() {
        var new_orientation = "N";
        switch (this.currentPiece.orientation) {
            case "N":
                new_orientation = "E";
                break;
            case "E":
                new_orientation = "S";
                break;
            case "S":
                new_orientation = "W";
                break;
            case "W":
                new_orientation = "N";
                break;
        }
        this.currentPiece.orientation = new_orientation;
        this.currentPiece.shape = shapes[this.currentPiece.type][this.currentPiece.orientation];
    }

    rotateLeft() {
        var new_orientation = "N";
        switch (this.currentPiece.orientation) {
            case "N":
                new_orientation = "W";
                break;
            case "E":
                new_orientation = "N";
                break;
            case "S":
                new_orientation = "E";
                break;
            case "W":
                new_orientation = "S";
                break;
        }
        this.currentPiece.orientation = new_orientation;
        this.currentPiece.shape = shapes[this.currentPiece.type][this.currentPiece.orientation];
    }

    moveLeft() {
        const position = new Point(this.currentPiece.position.x, this.currentPiece.position.y - 1);
        if (is_valid_move(this.board, this.currentPiece, position)) {
            this.currentPiece.position.y--;
        }
    }

    moveRight() {
        const position = new Point(this.currentPiece.position.x, this.currentPiece.position.y + 1);
        if (is_valid_move(this.board, this.currentPiece, position)) {
            this.currentPiece.position.y++;
        }
    }

    moveDown() {
        const position = new Point(this.currentPiece.position.x + 1, this.currentPiece.position.y);
        if (is_valid_move(this.board, this.currentPiece, position)) {
            this.currentPiece.position.x++;
        }
        else
        {
            this.placePiece();
        }
    }

    placePiece() {
        for (var i = 0; i < 4; i ++) {
            const piece = this.currentPiece;

            const x = piece.position.x + piece.shape[i].x - 1;
            const y = piece.position.y + piece.shape[i].y - 1;

            this.board[x][y] = colors.indexOf(piece.color);
        }

        //check if theres a line or point to be scored
        for (var i = 0; i < 25; i++) {
            var count =0;
            for (var j = 0; j < 10; j++) {
                if (this.board[i][j] > -1){
                    count++;
                }
            }

            //remove row
            if (count === 10) {
                //var index = this.board.indexOf(i);
                this.board.splice(i, 1);
                this.board.unshift(new Array(this.cols).fill(-1));
                this.score++;
            }
        }

        this.currentPiece = this.nextPiece;
        this.nextPiece = newPiece();
    }

}

function is_valid_move(board, piece, position) {
    for (let j =0; j<4;j++){
        let x = position.x + piece.shape[j].x - 1;
        let y = position.y + piece.shape[j].y - 1;

        //check for edges
        if (x > board.length - 1 || y > board[0].length -1 ){
            return false
        }

        if (x < 0 || y < 0){
            return false
        }

        // check for rubble
        if (board[x][y] > -1){
            return false
        }
    }

    return true
}

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
        <button className={props.className}>
        </button>
    );
}

function getRows(squares, piece) {
    return squares.map(function (key, index) {
        var row = key.map(function (key2, index2) {
            for (let j =0; j<4;j++){
                if (piece.shape[j].x === (index - piece.position.x + 1) && piece.shape[j].y === (index2 - piece.position.y + 1)) {
                    return <Square className={"square " + piece.color}/>;
                }
            }

            if (key2 == -1) {
                return <Square className={"square"}/>;
            }
            else {
                return <Square className={"square " + colors[key2]}/>;
            }

        });
        return <div value={index} className="board-row">{row}</div>
    });

}

function Board(props) {
    return (
        <div>
            {getRows(props.squares, props.piece)}
        </div>
    );
}


class ShapePreview extends React.Component {
    constructor() {
        super();
        this.state = {
            piece: initialGameState.gameBoard.currentPiece
        };
    }

    rows(piece) {
        var y_bounds = 0;
        var x_bounds = 0;
        const shape = piece.shape;
        const color = piece.color;
        var points = shape;
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
            prev[x - 1][y - 1] = "square " + color;
        }

        return prev.map(function (key, index) {
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
                {this.rows(this.props.piece)}
                <br/>
            </div>
        );
    }
}
//
//
// class PieceView extends React.Component {
//     pieces() {
//         var count = 0;
//         return this.props.piece.shape.map(sq => <Square className={"square " + this.props.piece.color} key={count++}
//                                                         row={sq.x + this.props.piece.position.x}
//                                                         col={sq.y + this.props.piece.position.y}/>);
//     }
//
//     render() {
//         return (
//             <div>
//                 {this.pieces()}
//             </div>
//         )
//     }
// }

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            gameState: initialGameState
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
        var board = this.state.gameState.gameBoard.board;
        const squares = board.slice();
        const currentPiece = this.state.gameState.gameBoard.currentPiece;
        const nextPiece = this.state.gameState.gameBoard.nextPiece;
        const score = this.state.gameState.gameBoard.score;
        const time = this.state.gameState.time;

        return (
            <div className="game">
                <div className="game-board">
                    {/*<PieceView piece={currentPiece}/>*/}
                    <Board squares={squares} piece={currentPiece}/>
                </div>
                <div className="game-info">
                    <div> Score: {score} </div>
                    <a href="#" onClick={() => this.startTimer()}> Play </a><br/>
                    <a href="#" onClick={() => this.pauseTimer()}> Pause </a><br/>
                    <a href="#" onClick={() => this.resetTimer()}> Reset </a><br/>
                    <div> Time Elapsed: {GetFormattedTime(time)} </div>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
                <div className="piece-preview">
                    {/*<ShapePreview name="Current piece" piece={currentPiece}/>*/}
                    <ShapePreview name="Next piece" piece={nextPiece}/>
                </div>
            </div>
        );
    }
}


const initialGameState = {
    "gameBoard": new GameBoard(25, 10),
    "time": 0,
    "locked":false,
}

const gamewatch = (state = initialGameState, action) => {
    if (!state.locked){
        switch (action.type) {
            case 'LEFT':
                state.gameBoard.moveLeft();
                return {
                    ...state,
                };
            case 'RIGHT':
                state.gameBoard.moveRight();
                return {
                    ...state,
                };
            case 'DOWN':
                state.gameBoard.moveDown();
                return {
                    ...state,
                };
            case 'ROTATE_RIGHT':
                state.gameBoard.rotateRight();
                return {
                    ...state,
                };
            case 'ROTATE_LEFT':
                state.gameBoard.rotateLeft();
                return {
                    ...state,
                };
            case 'RESET_TIMER':
                state = initialGameState;
                state.gameBoard = new GameBoard(25, 10);
                return {
                    ...state,
                };
            case 'STOP_TIMER':
                return {
                    ...state,
                    "time": state.time,
                };
            case 'TIME_INCREMENT':
                state.gameBoard.moveDown();
                return {
                    ...state,
                    "time": state.time + 1,
                };
            case 'TICK':
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
    else
    {
        return state;
    }

}

const store = Redux.createStore(gamewatch);
var game = ReactDOM.render(<Game/>, document.getElementById("game"));

store.subscribe(() => {
    game.setState({gameState: store.getState()})
});
