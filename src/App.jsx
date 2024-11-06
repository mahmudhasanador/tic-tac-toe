/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-gray-700 h-12 w-12 m-2 leading-9 text-lg font-bold"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay }) {
  let winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next Player ${xIsNext ? "O" : "X"}`;
  }

  function handleSquareClick(i) {
    if (squares[i] || winner) {
      return;
    }

    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[i] = "O") : (nextSquares[i] = "X");

    onPlay(nextSquares);
    
  }
  return (
    <>
      <div>{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

function History({ moves ,onMoveClick}) {
  const moveRecords = moves.map((move, index) => {
    let description;
    if (index > 0) {
      description = `Go to move #${index}`;
    }
    else{
      description = `Go to start the game`;
    }
    return (
      <li key={index} onClick={()=>onMoveClick(index)}>
        <button>{description}</button>
      </li>
    );
  });

  return <ol>{moveRecords}</ol>;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);

  let currentSquares = history[currentMove];
  console.log(currentSquares);

  function updateSquares(nextSquares) {
    setXIsNext(!xIsNext);
    let nextHistory = [...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }

  function jumpTo(index){
    if(index%2==0){
      setXIsNext(false)
    }else(
      setXIsNext(true)
    )
setCurrentMove(index);
  }

  return (
    <>
    <div className="flex gap-x-6" >

      <div>
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={updateSquares}
        />
      </div>

      <div className="bg-red-200 p-6 rounded-lg text-white">
        <History moves={history} onMoveClick={jumpTo}/>
      </div>
    </div>
    </>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
