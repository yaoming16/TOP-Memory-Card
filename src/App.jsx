import { useState, useEffect, useRef } from "react";

import AnimeCard from "./components/AnimeCard";
import SelectionSection from "./components/SelectionSection";

import "./styles/App.css";
import "./components/SelectionSection";

const URL_BASE = "https://api.jikan.moe/v4/";

function App() {
  // JIKAN API Anime characters
  //Characters by anime ID: "/anime/{id}/characters";
  //Top animes: https://api.jikan.moe/v4/top/anime;
  //DOCS: https://docs.api.jikan.moe/#/anime/getanimebyid

  const originalAnimeInfo = useRef(null);
  const [animesInfo, setAnimesInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [SelectedAnime, setSelectedAnime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStartedError, setGameStartedError] = useState(false);

  async function fetcData(url) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  useEffect(() => {
    async function fetchIds() {
      setLoading(true);
      const data = await fetcData(URL_BASE + "top/anime?type=tv");
      console.log(data.data);
      if (data) {
        let formatedAnimeInfo = [];
        for (let anime of data.data) {
          formatedAnimeInfo.push({
            id: anime.mal_id,
            imageUrl: anime.images.webp.large_image_url,
            title: anime.title,
          });
        }
        setAnimesInfo(formatedAnimeInfo);
        originalAnimeInfo.current = formatedAnimeInfo;
        setLoading(false);
      }
    }

    fetchIds();
  }, []);

  useEffect(() => {
    if (SelectedAnime) {
      setGameStartedError(false);
    }
  }, [SelectedAnime]);

  useEffect(() => {
    
  }, [gameStarted]);

  if (loading) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (!loading && !gameStarted) {
    return (
      <main>
        <section className="top-section">
          <h1>Anime memory Card Game</h1>
          <SelectionSection SelectedAnime={SelectedAnime} setAnimesInfo={setAnimesInfo} originalAnimeInfo={originalAnimeInfo}/>
          <button onClick={() => {
            if (SelectedAnime) {
              setGameStarted(true);
              setGameStartedError(false);
            } else {
              setGameStartedError(true);
            }
          }}>Start the game</button>
          {gameStartedError? <p>Please, select an anime before starting</p> : null}
        </section>
        <section className="cards-section">
          {animesInfo.map((anime) => (
            <AnimeCard key={anime.id} animeInfo={anime} setSelectedAnime={setSelectedAnime} />
          ))}
        </section>
      </main>
    );
  }

  if (!loading && gameStarted) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
      </main>
    );
  }
}

export default App;
