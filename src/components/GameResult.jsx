function GameResult({gameResult, handleBtn}) {
  return (
    <div>
      <p>{gameResult === 1 ? "You Won" : "You lost"}</p>
      <button onClick={() => handleBtn("anime")}>Return to Anime Selection</button>
      <button onClick={() => handleBtn("play")}>Play again</button>
    </div>

  );
}

export default GameResult;
