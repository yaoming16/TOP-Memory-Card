function GameResult({gameResult, handleBtn}) {
  return (
    <div className="game-result">
      <h2 className={gameResult === 1 ? "result-win" : "result-lose"}>
        {gameResult === 1 ? "🎉 You Won!" : "😔 You Lost!"}
      </h2>
      <div className="result-buttons">
        <button className="btn-secondary" onClick={() => handleBtn("anime")}>
          Return to Anime Selection
        </button>
        <button className="btn-primary" onClick={() => handleBtn("play")}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameResult;
