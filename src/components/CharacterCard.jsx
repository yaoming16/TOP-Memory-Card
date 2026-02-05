function CharacterCard({ characterInfo , manageClick  }) {

  return (
      <button className="card-div" onClick={() => manageClick(characterInfo.id)}>
        <img src={characterInfo.imageUrl} />
      </button>
  );
}

export default CharacterCard;
