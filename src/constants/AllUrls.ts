const BASE_URL = "https://api.mangadex.org";

export const GET_SEASONAL_UPDATES =
  BASE_URL + "/list/4be9338a-3402-4f98-b467-43fb56663927?includes[]=user";

export const GET_RECENTLY_UPDATED =
  BASE_URL +
  "/chapter?includes[]=manga&includes[]=scanlation_group&translatedLanguage[]=en&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&offset=0&limit=24";

export const GET_RECENTLY_ADDED =
  BASE_URL +
  "/manga?limit=30&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[createdAt]=desc&includes[]=cover_art";

export const COVER_URL = BASE_URL + "/cover?limit=1&offset=0&manga%5B%5D=";

export const COVER_FILTER =
  "&order%5BcreatedAt%5D=asc&order%5BupdatedAt%5D=asc&order%5Bvolume%5D=asc";

export const MANGA_DETAILS_URL_BUILD =
  BASE_URL +
  "/manga?includes[]=cover_art&order[followedCount]=desc&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&hasAvailableChapters=true&ids[]=";

export const IMAGE_URL = (
  mangaId: string,
  imageUrl: string,
  bit: string = ".256.jpg"
) => {
  return `https://mangadex.org/covers/${mangaId}/${imageUrl}${bit}`;
};

export const PERTICULAR_MANGA = (mangaId: string) => {
  return `${BASE_URL}/manga/${mangaId}?includes[]=artist&includes[]=author&includes[]=cover_art`;
};

export const GET_CHAPTERS = (
  mangaId: string,
  limit: number = 96,
  offset: number = 0
) => {
  return `${BASE_URL}/manga/${mangaId}/feed?translatedLanguage[]=en&limit=${limit}&includes[]=scanlation_group&includes[]=user&order[volume]=desc&order[chapter]=desc&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`;
};

export const GET_CHAPTER_IMAGES = (chapterId: string) => {
  return `${BASE_URL}/at-home/server/${chapterId}?forcePort443=false`;
};

export const GET_CHAPTER_DETAIL = (chapterId: string) => {
  return `${BASE_URL}/chapter/${chapterId}?includes[]=scanlation_group&includes[]=manga&includes[]=user`;
};

export const SEARCH_URL = (title: string) => {
  return `${BASE_URL}/manga?title=${title}&limit=5&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&includes[]=cover_art&order[relevance]=desc`;
};
