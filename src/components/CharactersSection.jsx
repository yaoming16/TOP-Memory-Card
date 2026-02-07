import CharacterCard from "./CharacterCard";

function CharactersSection({
  manageClick,
  animeCharacters,
  playedCharsIds,
  charsAmount,
  resetGame,
}) {
  return (
    <section className="cards-section characters-div">
      <button
        className="btn-primary go-back-btn"
        onClick={() => resetGame(null)}
      >
        Go back
      </button>
      <div className="characters-section">
        <div className="score-display">
          <span className="score-label">Score:</span>
          <span className="score-value">
            {playedCharsIds.length}/{charsAmount}
          </span>
        </div>
        {animeCharacters.map((char) => (
          <CharacterCard
            key={`character-${char.id}`}
            characterInfo={char}
            manageClick={manageClick}
          />
        ))}
      </div>
    </section>
  );
}

export default CharactersSection;
