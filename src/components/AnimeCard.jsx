import "../styles/Card.css";

function AnimeCard({ animeInfo, setSelectedAnime = null }) {
  return (
    <div className="card-div">
      <h3>{animeInfo.title}</h3>
      <img src={animeInfo.imageUrl} alt={animeInfo.title} />
      {setSelectedAnime ? (
        <button onClick={() => setSelectedAnime(animeInfo)}>
          Select Anime To Play
        </button>
      ) : null}
    </div>
  );
}

export default AnimeCard;
