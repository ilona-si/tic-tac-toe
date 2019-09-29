import "../styles/board.css"

import Square from "./square";
import * as React from "react";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null)
        }
    }

    handleClick = (i) => {
        const xCount = this.state.squares.filter(v => v === 'X').length;
        const oCount = this.state.squares.filter(v => v === 'O').length;
        const squares = this.state.squares.slice();
        if (squares[i] === null) {
            squares[i] = xCount > oCount ? 'O' : 'X';
            this.setState({
                squares: squares
            });
        }
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const status = "Next player: X";
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;