import AnimeCard from "./AnimeCard";

import "../styles/SelectionSection.css";

function SelectionSection({ SelectedAnime, setAnimesInfo, originalAnimeInfo }) {

  function filterInfo(stringToSearch) {
    if (stringToSearch === "") {
      setAnimesInfo(originalAnimeInfo.current);
      return;
    }
    let filteredInfo = originalAnimeInfo.current.filter((anime) => anime.title.toLowerCase().includes(stringToSearch))
    setAnimesInfo(filteredInfo);
  }

  return (
    <section className="selected-section">
      <div className="centered">
        <h3 className="">The selected anime is</h3>
        {SelectedAnime ? <AnimeCard animeInfo={SelectedAnime} /> : null}
      </div>
      <div className="centered">
        <label htmlFor="searchBar">Search anime to use in the game</label>
        <input type="text" id="searchBar" onChange={(e) => filterInfo(e.target.value.trim().toLowerCase())}></input>
      </div>
    </section>
  );
}

export default SelectionSection;
