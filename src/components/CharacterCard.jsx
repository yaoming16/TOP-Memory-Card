function CharacterCard({ characterInfo, manageClick }) {
  return (
    <div className="card-div">
      <button
        className="card-div"
        onClick={() => manageClick(characterInfo.id)}
      >
        <img src={characterInfo.imageUrl} />
      </button>
      <p>{characterInfo.name}</p>
    </div>
  );
}

export default CharacterCard;
