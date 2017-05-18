Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE'}));
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

    rotate() {
        switch (this.orientation) {
            case "N":
                this.orientation = "E";
            case "E":
                this.orientation = "S";
            case "S":
                this.orientation = "W";
            case "W":
                this.orientation = "N";
        }
        this.shape = shapes[this.type][this.orientation];
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
}

shapes.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % 2);
    var index2 = Math.floor(Math.random() * 1000000 % 4);
    var shape = shapes[Object.keys(shapes)[index]];
    return [shape[Object.keys(shape)[index2]], Object.keys(shape)[index], Object.keys(shape)[index2]];
}

function newPiece() {
    var temp = shapes.selectRandom()
    return new Piece(temp[1], temp[0], colors.selectRandom(), temp[0], new Point(0, 4))
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
    }

    movePiece(move) {
        switch (move) {
            case 'DOWN':
                this.currentPiece.position.x++;
                this.board = this.board;
        }
    }

    // placeBlock(){
    //     this.board
    // }
}

const initialGameState = {
    "gameBoard": new GameBoard(25, 10),
    "time": 0,
    "score": 0,
    "move": 'LEFT'
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
            state.gameBoard.movePiece("DOWN");
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

const store = Redux.createStore(gamewatch);

store.subscribe(() => {
    game.setState({gameState: store.getState()})
});

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
    rows(props) {
        let sqs = props.squares.slice();
        // for (let j = 0; j < 4; j++) {
        //     let x = props.piece.shape[j].x + props.piece.position.x - 1;
        //     let y = props.piece.shape[j].y + props.piece.position.y - 1;
        //     sqs[x][y] = colors.indexOf(props.piece.color);
        // }
        return sqs.map(function (key, index) {
            var row = key.map(function (key2) {
                if (key2 == -1) {
                    return <Square className={key2} value={"square"}/>;
                }
                else {
                    return <Square className={key2} value={"square " + colors[key2]}/>;
                }
            });
            return <div value={index} className="board-row">{row}</div>
        });

    }

    render() {
        return (
            <div>
                {this.rows(this.props)}
            </div>
        );
    }
}


class ShapePreview extends React.Component {
    constructor(props) {
        super();
        var y_bounds = 0;
        var x_bounds = 0;
        const piece = props.piece;
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
            gameState: store.getState()
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
        const squares = this.state.gameState.gameBoard.board;
        const currentPiece = this.state.gameState.gameBoard.currentPiece;
        const nextPiece = this.state.gameState.gameBoard.nextPiece;
        const score = this.state.gameState.score;
        const time = this.state.gameState.time;

        return (
            <div className="game">
                <div className="game-board">
                    {/*<PieceView piece={currentPiece}/>*/}
                    <Board squares={squares}/>
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
                    <ShapePreview name="Current piece" piece={currentPiece}/>
                    <ShapePreview name="Next piece" piece={nextPiece}/>
                </div>
            </div>
        );
    }
}