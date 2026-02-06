function CharacterCard({ characterInfo, manageClick }) {
  return (
    <div className="character-card-wrapper">
      <button
        className="character-card-button"
        onClick={() => manageClick(characterInfo.id)}
      >
        <img src={characterInfo.imageUrl} alt={characterInfo.name} />
      </button>
      <p className="character-name">{characterInfo.name}</p>
    </div>
  );
}

export default CharacterCard;
