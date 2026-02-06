const URL_BASE = "https://api.jikan.moe/v4/";
const URL_TOP_ANIME = "top/anime?type=tv&limit=25";
const ALL_ANIME = "anime?type=tv";

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
export async function fetchAnimesInfo() {
  // If already stored in session storage
  const storage = sessionStorage.getItem("topAnime");
  if (storage) {
    return JSON.parse(storage);
  }

  // If not in storage
  console.log("fetching animes");
  const data = await fetchData(URL_BASE + URL_TOP_ANIME);
  if (data) {
    let formatedAnimeInfo = [];
    for (let anime of data.data) {
      formatedAnimeInfo.push({
        id: anime.mal_id,
        imageUrl: anime.images.webp.large_image_url,
        title: anime.title,
      });
    }

    sessionStorage.setItem("topAnime", JSON.stringify(formatedAnimeInfo));
    return formatedAnimeInfo;
  }
}

// Function to fetch and save characters info from selected anime in the desired format
export async function fetchAnimeCharacters(selectedAnime) {
  // If already in session storage and the characters are from the selected anime
  const storage = JSON.parse(sessionStorage.getItem("selectedCharacters"));
  if (storage && storage.animeId === selectedAnime.id) {
    return storage.formatedAnimeCharacters;
  }

  // If not in session storage
  console.log("fetching characters");
  const data = await fetchData(
    URL_BASE + `anime/${selectedAnime.id}/characters`,
  );
  if (data) {
    let formatedAnimeCharacters = [];
    for (let char of data.data) {
      formatedAnimeCharacters.push({
        id: char.character.mal_id,
        name: char.character.name,
        imageUrl: char.character.images.webp.image_url,
      });
    }

    // We need to save the characters the user selected and also the animeId they are from
    sessionStorage.setItem(
      "selectedCharacters",
      JSON.stringify({
        formatedAnimeCharacters: formatedAnimeCharacters,
        animeId: selectedAnime.id,
      }),
    );
    return formatedAnimeCharacters;
  }
}

export const getShuffledArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
