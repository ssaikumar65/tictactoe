import { useEffect, useState } from "react";
import "./index.css";
const tiles = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Board = () => {
  const [value, setValue] = useState(Array(9).fill(""));
  const [circleTurn, setCircleTurn] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    const winner = getWinner();
    if (winner === "X") {
      setXScore((c) => c + 1);
      setIsGameOver(true);
    }
    if (winner === "O") {
      setOScore((c) => c + 1);
      setIsGameOver(true);
    }
  }, [circleTurn]);

  const onClickHandler = (index: number) => {
    if (value[index].length === 0) {
      if (circleTurn) {
        setValue((value) => {
          value[index] = "O";
          return value;
        });
      } else {
        setValue((value) => {
          value[index] = "X";
          return value;
        });
      }
      setCircleTurn(!circleTurn);
      setFilled((filled) => filled + 1);
      if (filled === 8) setIsGameOver(true);
    }
  };

  const getWinner = () => {
    for (let i = 0; i < tiles.length; i++) {
      const [a, b, c] = tiles[i];
      if (value[a] && value[a] === value[b] && value[a] === value[c]) {
        return value[a];
      }
    }
    return null;
  };

  const onGameOver = () => {
    setValue(Array(9).fill(""));
    setCircleTurn(false);
    setIsGameOver(false);
    setFilled(0);
  };

  return (
    <div className="board">
      <div className="score left">{xScore}</div>
      <div className="score right">{oScore}</div>
      <div className="heading">Tic Tac Toe</div>
      {isGameOver ? (
        <>
          <div className="gameover title">
            {getWinner() ? (
              <span>Player {getWinner()} won this match</span>
            ) : (
              <span>Draw</span>
            )}
          </div>
          <div className="gameover button">
            <button onClick={onGameOver}>Restart</button>
          </div>
        </>
      ) : null}

      {value.map((item, index) => (
        <div
          onClick={() => onClickHandler(index)}
          key={index}
          className={`cell ${isGameOver ? "over" : null}`}
        >
          {item}
          <div className={`placeholder ${item.length === 0 ? "" : "hide"}`}>
            {circleTurn ? "O" : "X"}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Board;
