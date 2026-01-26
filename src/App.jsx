import { useState, useEffect, useRef } from "react";

import AnimeCard from "./components/AnimeCard";
import SelectionSection from "./components/SelectionSection";
import CharacterCard from "./components/CharacterCard";

import { fetchAnimeCharacters, fetchAnimesInfo } from "./utils/animeApi";

import "./styles/App.css";
import "./components/SelectionSection";

function App() {
  // JIKAN API Anime characters
  //Characters by anime ID: "/anime/{id}/characters";
  //Top animes: https://api.jikan.moe/v4/top/anime;
  //DOCS: https://docs.api.jikan.moe/#/anime/getanimebyid

  const originalAnimeInfo = useRef(null);
  const [animesInfo, setAnimesInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameStartedError, setGameStartedError] = useState(false);
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [playedCharsIds, setPlayedCharsIds] = useState([]);
  const [gameResult, setGameResult] = useState(null);

  function manageClick(playedId) {
    if (playedCharsIds.some((charId) => charId === playedId)) {
      setGameResult(-1);
      setGameStarted(false);
    }
    
    setAnimeCharacters((prev) => [...prev, playedId]);
  }

  // fetch anime info on load
  useEffect(() => {
    fetchAnimesInfo(setAnimesInfo, setLoading, originalAnimeInfo);
  }, []);

  // After an anime is selected change game start error to false
  useEffect(() => {
    if (selectedAnime) {
      setGameStartedError(false);
    }
  }, [selectedAnime]);

  // fetch characters from the selected anime after the user clicks the start game button and starts the game
  useEffect(() => {
    if (selectedAnime && gameStarted) {
      fetchAnimeCharacters(setLoading, setAnimeCharacters);
    }
  }, [gameStarted]);

  //return if game is loading
  if (loading) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
        <p>Loading...</p>
      </main>
    );
  }

  // return if
  if (!loading && !gameStarted && !gameResult) {
    return (
      <main>
        <section className="top-section">
          <h1>Anime memory Card Game</h1>
          <SelectionSection
            selectedAnime={selectedAnime}
            setAnimesInfo={setAnimesInfo}
            originalAnimeInfo={originalAnimeInfo}
          />
          <button
            onClick={() => {
              if (selectedAnime) {
                setGameStarted(true);
                setGameStartedError(false);
              } else {
                setGameStartedError(true);
              }
            }}
          >
            Start the game
          </button>
          {gameStartedError ? (
            <p>Please, select an anime before starting</p>
          ) : null}
        </section>
        <section className="cards-section">
          {animesInfo.map((anime) => (
            <AnimeCard
              key={`anime-${anime.id}`}
              animeInfo={anime}
              setSelectedAnime={manageClick}
            />
          ))}
        </section>
      </main>
    );
  }

  if (!loading && gameStarted && !gameResult) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
        <section className="cards-section">
          {animeCharacters.map((char) => (
            <CharacterCard
              key={`character-${char.id}`}
              characterInfo={char}
              manageClick={setSelectedAnime}
            />
          ))}
        </section>
      </main>
    );
  }
}

export default App;
