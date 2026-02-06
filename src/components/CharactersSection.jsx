import CharacterCard from "./CharacterCard";

function CharactersSection({
  manageClick,
  animeCharacters,
  playedCharsIds,
  charsAmount,
}) {
  return (
    <section className="cards-section characters-section">
      <div className="score-display">
        <span className="score-label">Score:</span>
        <span className="score-value">{playedCharsIds.length}/{charsAmount}</span>
      </div>
      {animeCharacters.map((char) => (
        <CharacterCard
          key={`character-${char.id}`}
          characterInfo={char}
          manageClick={manageClick}
        />
      ))}
    </section>
  );
}

export default CharactersSection;
