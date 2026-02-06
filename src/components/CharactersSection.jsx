import CharacterCard from "./CharacterCard";

function CharactersSection({
  manageClick,
  animeCharacters,
  playedCharsIds,
  charsAmount,
}) {
  return (
    <section className="cards-section characters-section">
      <p>
        Score: {playedCharsIds.length}/{charsAmount}
      </p>
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
