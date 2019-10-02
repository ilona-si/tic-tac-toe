import * as React from "react";
import Board from "./board";
import "../styles/game.css"

class Game extends React.Component {
    winner = null;

    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            isXNext: true,
            stepNumber: 0
        };
    }

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        let currentSquares = history[history.length - 1];
        const squares = currentSquares.squares.slice();
        if (this.winner || squares[i]) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : '0';
        this.setState({
            history: history.concat({squares}),
            isXNext: !this.state.isXNext,
            stepNumber: history.length,
        });

    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        let currentSquares = history[this.state.stepNumber].squares;
        this.winner = calculateWinner(currentSquares);
        const status = this.winner ?
            ('Выиграл ' + this.winner) : ("Next player: " + (this.state.isXNext ? 'X' : 'O'));

        const moves = history.map((step, move) => {
            const desc = move ?
                'Перейти к ходу #' + move :
                'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={currentSquares}
                           onClick={(i) => this.handleClick(i)}/>
                </div>

                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    let winner = null;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    lines.forEach(combination => {
        const [a, b, c] = combination;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner = squares[a];
        }
    });

    return winner;
}


export default Game;