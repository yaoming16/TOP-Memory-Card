function CharacterCard({ characterInfo , manageClick  }) {


  return (
    <div className="card-div">
      <button onClick={() => manageClick(characterInfo.id)}>
        <img src={characterInfo.imageUrl} />
      </button>
    </div>
  );
}

export default CharacterCard;
