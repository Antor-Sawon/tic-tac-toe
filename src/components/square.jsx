import React from "react";

function Square(props) {
  return (
    <div>
    <button className="square" onClick={props.onClick}>
      <div>{props.value}</div>
    </button>
    </div>
  );
}

export default Square;
