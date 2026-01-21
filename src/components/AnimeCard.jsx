function AnimeCard({ animeInfo, setSelectedId }) {
  return (
    <div>
      <h3>{animeInfo.title}</h3>
      <img src={animeInfo.imageUrl}/>
      <button onClick={() => setSelectedId(animeInfo.id)}>Select Anime To Play</button>
    </div>
  );
}

export default AnimeCard;
