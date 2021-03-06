Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE_RIGHT'}));
Mousetrap.bind('down', () => store.dispatch({type: 'DOWN'}));
// Mousetrap.bind('down', () => store.dispatch({type: 'ROTATE_LEFT'}));
Mousetrap.bind('space', () => store.dispatch({type: 'DROP'}));
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
var colors = ["blue", "green", "red", "yellow", "orange", "purple", "cyan"]

colors.selectRandom = function () {
    var index = Math.floor(Math.random() * 1000000 % colors.length);
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
    return new Piece(temp[0], temp[1], colors.selectRandom(), temp[3], new Point(0, 4))
}

class GameBoard {
    constructor(rows, columns, difficulty = 0) {
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
        this.time = 0;
        this.paused = true;
        this.gameover = false;
        this.time_interval = 0;
        this.tick = 0;
        this.difficulty = difficulty;
        this.moves = new Object();
        this.game_id = document.getElementById("game_id").value;
        this.speed = 1000 - (50 * this.difficulty);
        // this.moves["user_id"] = "blah";
    }

    rotateRight() {
        this.logAction("ROTATE");
        let new_orientation = "N";
        const test = newPiece();
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
        test.position = this.currentPiece.position;
        test.orientation = new_orientation;
        test.shape = shapes[this.currentPiece.type][new_orientation];
        if (is_valid_move(this.board, test, test.position)) {
            this.currentPiece.orientation = new_orientation;
            this.currentPiece.shape = shapes[this.currentPiece.type][new_orientation];
        }
    }

    moveLeft() {
        this.logAction("LEFT");
        const position = new Point(this.currentPiece.position.x, this.currentPiece.position.y - 1);
        if (is_valid_move(this.board, this.currentPiece, position)) {
            this.currentPiece.position.y--;
        }
    }

    moveRight() {
        this.logAction("RIGHT");
        const position = new Point(this.currentPiece.position.x, this.currentPiece.position.y + 1);
        if (is_valid_move(this.board, this.currentPiece, position)) {
            this.currentPiece.position.y++;
        }
    }

    moveDown() {
        // check if current space is occupied
        // display game over message
        const curr_position = new Point(this.currentPiece.position.x, this.currentPiece.position.y);
        if (!is_valid_move(this.board, this.currentPiece, curr_position)) {
            // reset game
            this.gameover = true;
            let logData = {
                "game_id": this.game_id,
                "score": this.score,
                "time_taken": this.time
            };
            logGame(logData);
        }
        else {
            const down_position = new Point(this.currentPiece.position.x + 1, this.currentPiece.position.y);
            if (is_valid_move(this.board, this.currentPiece, down_position)) {
                this.currentPiece.position.x++;
            }
            else {
                this.placePiece();
            }
        }
    }

    // check every position below the piece until it collides with rubble
    // place piece on the previous position when rubble is encountered
    drop() {
        this.logAction("DROP")
        const curr_position = new Point(this.currentPiece.position.x, this.currentPiece.position.y);
        for (let i = 0; i < this.rows; i++) {
            curr_position.x++;
            if (!is_valid_move(this.board, this.currentPiece, curr_position)) {
                curr_position.x--;
                break;
            }
        }
        this.currentPiece.position = curr_position;
        this.placePiece();
    }

    updateDifficulty() {
        this.difficulty = Math.floor(this.score / 10);
        this.speed = 1000 - (50 * this.difficulty);
        clearInterval(this.tick);
        // clearInterval(this.time_interval);
        this.tick = startTimer('TICK', this.speed);
    }

    logAction(action) {
        var state = "";
        for (let i = 0; i < this.rows; i++) {
            let num = "";
            for (let j = 0; j < this.cols; j++) {
                let bit = this.board[i][j] > 0 ? "1" : "0";
                num = num + bit;
            }
            state = state + parseInt(num, 2).toString();
        }

        state += "-" +  this.currentPiece.orientation + " " + (this.currentPiece.position.x) + "/" + (this.currentPiece.position.y);

        // if (state in this.moves) {
        //     this.moves[state].unshift(action);
        // }
        // else {
        //     this.moves[state] = [action];
        // }

        let postData = {
            // "headers": { 'crossDomain': true },
            "game_id": this.game_id,
            "state": state,
            "action": action
        }
        logEvent(postData);
    }

    placePiece() {
        for (var i = 0; i < 4; i++) {
            const piece = this.currentPiece;

            const x = piece.position.x + piece.shape[i].x - 1;
            const y = piece.position.y + piece.shape[i].y - 1;

            this.board[x][y] = colors.indexOf(piece.color);
        }

        //check if there is a line or point to be scored
        for (var i = 0; i < this.rows; i++) {
            var count = 0;
            for (var j = 0; j < 10; j++) {
                if (this.board[i][j] > -1) {
                    count++;
                }
            }

            //remove row
            if (count === this.cols) {
                //var index = this.board.indexOf(i);
                this.board.splice(i, 1);
                this.board.unshift(new Array(this.cols).fill(-1));
                this.score++;
            }
        }

        this.currentPiece = this.nextPiece;
        this.nextPiece = newPiece();
        this.updateDifficulty();
    }

}

function is_valid_move(board, piece, position) {
    for (let j = 0; j < 4; j++) {
        let x = position.x + piece.shape[j].x - 1;
        let y = position.y + piece.shape[j].y - 1;

        //check for edges
        if (x > board.length - 1 || y > board[0].length - 1) {
            return false
        }

        if (x < 0 || y < 0) {
            return false
        }

        // check for rubble
        if (board[x][y] > -1) {
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

function logEvent(Data) {
    axios.post('/tetris/log_event/',
        JSON.stringify(Data)
    ).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

function logGame(Data) {
    axios.post('/tetris/log_game/',
        JSON.stringify(Data)
    ).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
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
            for (let j = 0; j < 4; j++) {
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

function startTimer(name, speed) {
    var interval_id = setInterval(() => store.dispatch({type: name}), speed);
    return interval_id;
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

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            // game_id: this.props.game_id,
            gameState: initialGameState
        };
    }

    render() {
        var board = this.state.gameState.gameBoard.board;
        const squares = board.slice();
        const currentPiece = this.state.gameState.gameBoard.currentPiece;
        const nextPiece = this.state.gameState.gameBoard.nextPiece;
        const score = this.state.gameState.gameBoard.score;
        const time = this.state.gameState.gameBoard.time;

        return (
            <div className="game">
                <div
                    className={this.state.gameState.gameBoard.gameover || this.state.gameState.gameBoard.paused ? 'game-board paused' : 'game-board'}>
                    <h2>{this.state.gameState.gameBoard.gameover ? 'Game over:' : this.state.gameState.gameBoard.paused ? 'Paused' : ''}</h2>
                    {/*<h2>{this.state.gameState.gameBoard.gameover ? 'Score - ' + score  : ''}</h2>*/}
                    {/*<h2>{this.state.gameState.gameBoard.gameover ? 'Time - ' + time  : ''}</h2>*/}

                    <Board squares={squares} piece={currentPiece}/>
                </div>
                <div className="game-info">
                    <Controls time={time } score={score} paused={this.state.gameState.gameBoard.paused}
                              gameover={this.state.gameState.gameBoard.gameover}/>
                </div>
                <div className="piece-preview">
                    <ShapePreview name="Next piece" piece={nextPiece}/>
                </div>
            </div>
        );
    }
}

function Controls(props) {
    if (!props.gameover) {
        return (
            <div className="controls">
                <div> Score: {props.score} </div>
                <div> Time Elapsed: {GetFormattedTime(props.time)} </div>
                <a href="#" onClick={() => store.dispatch({type: 'START'}) }> Play </a><br/>
                <a href="#" onClick={() => store.dispatch({type: 'PAUSE'}) }> Pause </a><br/>
                <a href="#" onClick={() => store.dispatch({type: 'STOP'}) }> Restart </a><br/>
            </div>
        )
    }
    else {
        return (
            <div className="controls">
                <div> Score: {props.score} </div>
                <div> Time Elapsed: {GetFormattedTime(props.time)} </div>
                <a href="#" onClick={() => store.dispatch({type: 'STOP'}) }> New Game </a><br/>
            </div>
        )
    }

}

const initialGameState = {
    "gameBoard": new GameBoard(25, 10, 0),
}

const gamewatch = (state = initialGameState, action) => {
    if (!state.gameBoard.gameover && !state.gameBoard.paused) {
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
                state.gameBoard.logAction("DOWN");
                state.gameBoard.moveDown();
                return {
                    ...state,
                };
            case 'DROP':
                state.gameBoard.drop();
                return {
                    ...state,
                };
            case 'ROTATE_RIGHT':
                state.gameBoard.rotateRight();
                return {
                    ...state,
                };
            case 'START':
                clearInterval(state.gameBoard.time_interval);
                clearInterval(state.gameBoard.tick);
                state.gameBoard.tick = startTimer('TICK', state.gameBoard.speed);
                state.gameBoard.time_interval = startTimer('TIME_INCREMENT', 1000);
                state.gameBoard.paused = false;
                return {
                    ...state,
                };
            case 'PAUSE':
                clearInterval(state.gameBoard.time_interval);
                clearInterval(state.gameBoard.tick);
                state.gameBoard.paused = true;
                return {
                    ...state,
                };
            case 'STOP':
                clearInterval(state.gameBoard.time_interval);
                clearInterval(state.gameBoard.tick);
                state = initialGameState;
                state.gameBoard = new GameBoard(state.gameBoard.rows, state.gameBoard.cols, state.gameBoard.difficulty);
                return {
                    ...state,
                };
            case 'TIME_INCREMENT':
                state.gameBoard.time = state.gameBoard.time + 1;
                return {
                    ...state,
                };
            case 'TICK':
                state.gameBoard.moveDown();
                return {
                    ...state,
                };
            default:
                return state;
        }
    }
    else {
        if (action.type === 'STOP') {
            clearInterval(state.gameBoard.time_interval);
            clearInterval(state.gameBoard.tick);
            state = initialGameState;
            state.gameBoard = new GameBoard(state.gameBoard.rows, state.gameBoard.cols, state.gameBoard.difficulty);
            return {
                ...state,
            };
        }

        if (action.type === 'START') {
            clearInterval(state.gameBoard.time_interval);
            clearInterval(state.gameBoard.tick);
            state.gameBoard.tick = startTimer('TICK', state.gameBoard.speed);
            state.gameBoard.time_interval = startTimer('TIME_INCREMENT', 1000);
            state.gameBoard.paused = false;
            return {
                ...state,
            };
        }

        return state;
    }
}

const store = Redux.createStore(gamewatch);
// const game_id = document.getElementById("game_id");
var game = ReactDOM.render(<Game  />, document.getElementById("game"));

store.subscribe(() => {
    game.setState({gameState: store.getState()})
});
