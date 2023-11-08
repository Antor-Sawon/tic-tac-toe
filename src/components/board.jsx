import React from "react";
import Square from "./square";

function Board(props) {
  const renderSquare = (i) => (
    <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  return (
    <div
      className="d-flex flex-column bg-secondary border"
      style={{ gap: "1px" }}
    >
      <div className="board-row">{[0, 1, 2].map((i) => renderSquare(i))}</div>
      <div className="board-row">{[3, 4, 5].map((i) => renderSquare(i))}</div>
      <div className="board-row">{[6, 7, 8].map((i) => renderSquare(i))}</div>
    </div>
  );
}

export default Board;
