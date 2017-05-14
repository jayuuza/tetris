Mousetrap.bind('up', () => store.dispatch({type: 'ROTATE'}));
Mousetrap.bind('space', () => store.dispatch({type: 'DOWN'}));
Mousetrap.bind('left', () => store.dispatch({type: 'LEFT'}));
Mousetrap.bind('right', () => store.dispatch({type: 'RIGHT'}));

const initialGameState = {
    "time": 0,
    "piece": 0,
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
    game.setState({game_state: store.getState()})
});

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

function GetFormattedTime(totalSeconds){
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds - minutes * 60;
    var hours = Math.floor(totalSeconds / 3600);
    var finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    return finalTime;
}

function Square(props) {
    return (
        <button className={props.value}>
        </button>
    );
}


class Scoreboard extends React.Component {
    startTimer() {
        this.interval = setInterval(() => store.dispatch({type: 'TICK'}), 1000);
    }

    pauseTimer() {
        clearInterval(this.interval);
    }

    resetTimer() {
        store.dispatch({type: 'RESET_TIMER'});
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <div> Score: {this.props.score} </div>
                <a href="#" onClick={() => this.startTimer()}> Play </a><br/>
                <a href="#" onClick={() => this.pauseTimer()}> Pause </a><br/>
                <a href="#" onClick={() => this.resetTimer()}> Reset </a><br/>
                <div> Time Elapsed: {GetFormattedTime(this.props.time)} </div>
            </div>
        );
    }
}


class Board extends React.Component {
    rows() {
        return this.props.squares.map(function (key, index, squares) {
            var row = key.map(function (key, index, sq) {
                return <Square className={key} value={key}/>;
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

class Game extends React.Component {
    constructor() {
        super();
        var rows = 25;
        var columns = 10;
        var x = new Array(rows).fill(null);
        for (var i = 0; i < rows; i++) {
            x[i] = new Array(columns).fill("square white");
        }
        this.state = {
            squares: x,
            rows: rows,
            cols: columns,
            score: 0,
            game_state: store.getState()

        };
    }

    render() {
        const squares = this.state.squares;
        const score = this.state.score;
        const time = this.state.game_state.time;

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={squares}/>
                </div>
                <div className="game-info">
                    <Scoreboard score={score} time={time}/>
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}
