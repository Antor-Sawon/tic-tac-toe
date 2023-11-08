import React from "react";
import Board from "./board";

const initilArr = Array(9).fill(null);

function calculateWinner(s) {
  let cases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  function isWinner(p) {
    let indicesOf_p = s.map((e, i) => {
      if (e === p) {
        return i;
      }
    });

    let matchedArray = cases
      .map((e) => indicesOf_p.filter((i) => e.includes(i)))
      .filter((arr) => arr.length === 3);

    return !!matchedArray.length;
  }

  return isWinner("x") || isWinner("o");
}

class Game extends React.Component {
  state = {
    history: [{ squares: initilArr }],
    stepNumber: 0,
    xIsNext: true,
  };

  currentSquares = initilArr;

  handleClick = (i) => {
    if (this.state.history.slice(1).length > this.state.stepNumber) {
      this.state.history = this.state.history.slice(
        0,
        this.state.stepNumber + 1
      );
    }

    let squares = this.state.history.slice(-1)[0].squares.slice();
    let { stepNumber, xIsNext } = this.state;

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "x" : "o";
    this.currentSquares = squares;
    stepNumber += 1;
    xIsNext = !xIsNext;

    let editedHistory = this.state.history.slice().concat([{ squares }]);
    this.setState({ history: editedHistory, stepNumber, xIsNext });
  };

  handleStart = () => {
    this.currentSquares = initilArr;
    this.setState({
      history: [{ squares: initilArr }],
      stepNumber: 0,
      xIsNext: true,
    });
  };

  handleHistory = (e, n) => {
    this.currentSquares = e.squares;
    this.setState({ stepNumber: n, xIsNext: n % 2 ? false : true });
  };

  render() {
    return (
      <div className="d-flex flex-wrap flex-row column-gap-4">
        <div className="mt-2">
          <Board squares={this.currentSquares} onClick={this.handleClick} />
        </div>
        <div>
          <p className="fs-5 fw-semibold">
            {(() => {
              if (calculateWinner(this.currentSquares)) {
                return `Winner is ${this.state.xIsNext ? "O" : "X"}`;
              } else if (
                !calculateWinner(this.currentSquares) &&
                !this.currentSquares.includes(null)
              ) {
                return "Match is draw";
              } else {
                return `Next player: ${this.state.xIsNext ? "X" : "O"}`;
              }
            })()}
          </p>
          <ol className="ms-0 p-0">
            <div
              role="button"
              className="bg-body-secondary mb-2 rounded px-2"
              onClick={this.handleStart}
            >
              Go to game start
            </div>

            {this.state.history.slice(1).map((e, i) => {
              if (e !== null) {
                return (
                  <div
                    role="button"
                    key={i}
                    className="bg-body-secondary mb-1 rounded"
                    onClick={this.handleHistory.bind(this, e, i + 1)}
                  >
                    <li>Go to move #{i + 1}</li>
                  </div>
                );
              }
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Game;
