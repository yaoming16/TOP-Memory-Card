const URL_BASE = "https://api.jikan.moe/v4/";

//Function to fetch data
async function fetchData(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
    return null;
  }
}

// Function to fetch and save anime info in the desired format
export async function fetchAnimesInfo(setAnimesInfo, setLoading, originalAnimeInfoRef) {
  setLoading(true);
  const data = await fetchData(URL_BASE + "top/anime?type=tv");
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
    originalAnimeInfoRef.current = formatedAnimeInfo;
    setLoading(false);
  }
}

// Function to fetch and save characters info from selected anime in the desired format
export async function fetchAnimeCharacters(setLoading, setAnimeCharacters) {
  setLoading(true);
  const data = await fetchData(
    URL_BASE + `anime/${selectedAnime.id}/characters`,
  );
  if (data) {
    let formatedAnimeCharacters = [];
    for (let char of data.data) {
      console.log(char);
      formatedAnimeCharacters.push({
        id: char.character.mal_id,
        name: char.character.name,
        imageUrl: char.character.images.webp.image_url,
      });
    }
    setAnimeCharacters(formatedAnimeCharacters);
    setLoading(false);
  }
}
