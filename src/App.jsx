import { useState, useEffect, useRef } from "react";

import AnimeCard from "./components/AnimeCard";
import SelectionSection from "./components/SelectionSection";
import GameResult from "./components/GameResult";
import CharactersSection from "./components/CharactersSection";

import {
  fetchAnimeCharacters,
  fetchAnimesInfo,
  getShuffledArray,
} from "./utils/animeApi";

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
  const allAnimeCharacters = useRef([]);

  function manageClick(playedId) {
    if (playedCharsIds.some((charId) => charId === playedId)) {
      setGameResult(-1);
      setGameStarted(false);
      setPlayedCharsIds([]);
      return;
    }

    let nextPlayed = [...playedCharsIds, playedId];

    if (nextPlayed.length > 0) {
      let elementsToShow = getShuffledArray(allAnimeCharacters.current).slice(
        0,
        CHARACTERS_SHOW,
      );
      while (!elementsToShow.some((elem) => !nextPlayed.includes(elem.id))) {
        elementsToShow = getShuffledArray(allAnimeCharacters.current).slice(
          0,
          CHARACTERS_SHOW,
        );
      }

      setPlayedCharsIds(nextPlayed);
      setAnimeCharacters(elementsToShow);
    }
  }

  function handleGameResultBtn(type) {
    if (type === "play") {
      setGameStarted(true);
      setGameResult(null);
      return;
    }
    if (type === "anime") {
      setGameResult(null);
    }
  }

  //Set characters to show while playing
  const CHARACTERS_SHOW = 10;

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
      setLoading(true);
      (async function () {
        allAnimeCharacters.current = await fetchAnimeCharacters(selectedAnime);
        setAnimeCharacters(
          allAnimeCharacters.current.slice(0, CHARACTERS_SHOW),
        );
      })();
      setLoading(false);
    }
  }, [gameStarted]);

  // Check if player won
  useEffect(() => {
    if (
      gameStarted &&
      playedCharsIds.length === allAnimeCharacters.current.length
    ) {
      setGameResult(1);
      setGameStarted(false);
      setPlayedCharsIds([]);
    }
  }, [playedCharsIds]);

  let content;
  //return if game is loading
  if (loading) {
    content = <p>Loading...</p>;
  }

  // return if
  if (!loading && !gameStarted && !gameResult) {
    content = (
      <>
        <section className="top-section">
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
              setSelectedAnime={setSelectedAnime}
            />
          ))}
        </section>
      </>
    );
  }

  if (!loading && gameStarted && !gameResult) {
    content = (
      <CharactersSection
        manageClick={manageClick}
        animeCharacters={animeCharacters}
        playedCharsIds={playedCharsIds}
        charsAmount={allAnimeCharacters.current.length}
      />
    );
  }

  if (gameResult === 1 || gameResult === -1) {
    content = (
      <GameResult gameResult={gameResult} handleBtn={handleGameResultBtn} />
    );
  }

  return (
    <main>
      <h1>Anime Memory Game</h1>
      {content}
    </main>
  );
}

export default App;
