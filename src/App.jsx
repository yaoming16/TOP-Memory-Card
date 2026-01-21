import { useState, useEffect } from "react";

import AnimeCard from "./components/AnimeCard";

import "./styles/App.css";

const URL_BASE = "https://api.jikan.moe/v4/";

function App() {
  // JIKAN API Anime characters
  //Characters by anime ID: "/anime/{id}/characters";
  //Top animes: https://api.jikan.moe/v4/top/anime;
  //DOCS: https://docs.api.jikan.moe/#/anime/getanimebyid

  const [animesInfo, setAnimesInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [animeToSearch, setAnimeToSearch] = useState("");

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
        setLoading(false);
      }
    }

    fetchIds();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
        <p>Loading...</p>
      </main>
    );
  }

  if (!loading) {
    return (
      <main>
        <h1>Anime memory Card Game</h1>
        <section>
          {animesInfo.map((anime) => (
            <AnimeCard animeInfo={anime} setSelectedId={setSelectedId} />
          ))}
        </section>
      </main>
    );
  }
}

export default App;
