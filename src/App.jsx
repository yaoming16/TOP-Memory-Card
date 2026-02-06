import { useState, useEffect, useRef } from "react";

import AnimeCard from "./components/AnimeCard";
import SelectionSection from "./components/SelectionSection";
import GameResult from "./components/GameResult";
import CharactersSection from "./components/CharactersSection";

import { fetchAnimeCharacters, fetchAnimesInfo } from "./utils/animeApi";
import {
  getShuffledArray,
  sliceIfLargeEnough,
  sliceAFractionOfArrLength,
} from "./utils/functions";

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
  const [gameDifficulty, setGameDifficulty] = useState(1);
  const allAnimeCharacters = useRef([]);
  const targetScroll = useRef(null);

  function resetGame(result) {
    setGameResult(result);
    setGameStarted(false);
    setPlayedCharsIds([]);
  }

  function manageClick(playedId) {
    if (playedCharsIds.some((charId) => charId === playedId)) {
      resetGame(-1);
      return;
    }

    let nextPlayed = [...playedCharsIds, playedId];
    if (nextPlayed.length === allAnimeCharacters.current.length) {
      resetGame(1);
      return;
    }

    if (nextPlayed.length > 0) {
      let elementsToShow = sliceIfLargeEnough(
        getShuffledArray(allAnimeCharacters.current),
        CHARACTERS_SHOW,
      );
      while (!elementsToShow.some((elem) => !nextPlayed.includes(elem.id))) {
        elementsToShow = sliceIfLargeEnough(
          getShuffledArray(allAnimeCharacters.current),
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
    (async function () {
      setLoading(true);
      originalAnimeInfo.current = await fetchAnimesInfo();
      setAnimesInfo(originalAnimeInfo.current);
      setLoading(false);
    })();
  }, []);

  // After an anime is selected change game start error to false
  useEffect(() => {
    if (selectedAnime) {
      setGameStartedError(false);
    }
    if (targetScroll.current) {
      targetScroll.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedAnime]);

  // fetch characters from the selected anime after the user clicks the start game button and starts the game
  useEffect(() => {
    if (selectedAnime && gameStarted) {
      (async function () {
        setLoading(true);
        allAnimeCharacters.current = await fetchAnimeCharacters(selectedAnime);

        if (gameDifficulty < 1) {
          allAnimeCharacters.current = sliceAFractionOfArrLength(
            allAnimeCharacters.current,
            gameDifficulty,
          );
        }

        setAnimeCharacters(
          sliceIfLargeEnough(allAnimeCharacters.current, CHARACTERS_SHOW),
        );
        setLoading(false);
      })();
    }
  }, [gameStarted]);

  let content;
  //return if game is loading
  if (loading) {
    content = (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // return if
  if (!loading && !gameStarted && !gameResult) {
    content = (
      <>
        <section id="topSection" className="top-section" ref={targetScroll}>
          <SelectionSection
            selectedAnime={selectedAnime}
            setAnimesInfo={setAnimesInfo}
            originalAnimeInfo={originalAnimeInfo}
          />

          <button
          className="btn-primary center"
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
            <p className="danger">Please, select an anime before starting</p>
          ) : null}

          <div>
            <p>Play with:</p>
            <div className="btn-section">
              <button onClick={() => setGameDifficulty(1 / 3)}  className={`${gameDifficulty === 1/3 ? 'active-btn' : ''} dif-btn`}>
                A third of the Characters
              </button>
              <button onClick={() => setGameDifficulty(1 / 2)} className={`${gameDifficulty === 1/2 ? 'active-btn' : ''} dif-btn`}>
                Half the Characters
              </button>
              <button onClick={() => setGameDifficulty(1)} className={`${gameDifficulty === 1 ? 'active-btn' : ''} dif-btn`}>
                All the Characters
              </button>
            </div>
          </div>
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
