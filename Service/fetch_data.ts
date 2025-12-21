import CustomResponse from "@/Types/response_type";
import {
  MISSING_REQUIREMENT,
  TASK_COMPLETE,
  TASK_FAILED,
  UNKNOWN_ERROR,
} from "@/Utility/error_message";

const STATIC_DATA = `{ id title { romaji english native } description source season seasonYear genres episodes status format duration averageScore popularity favourites 
   studios(isMain: true) { nodes { name id } } nextAiringEpisode { airingAt timeUntilAiring episode } 
   characters { edges { role  node {  id name { full } image { large }  }  } } relations { edges { relationType node { id title { romaji } coverImage { extraLarge large medium } format } } } coverImage { extraLarge large medium } 
   bannerImage } }`;

const QUERY = `query ($id: Int) { Media(id: $id, type: ANIME) ${STATIC_DATA} `;

const QUERY_ALL = `query ($page: Int, $perPage: Int) { Page(page: $page, perPage: $perPage) { media(type: ANIME) ${STATIC_DATA} }`;

const QUERY_SEARCH = `query ($search: String) { Page(perPage: 20) { media(search: $search, type: ANIME) ${STATIC_DATA} }`;

const QUERY_FILTER = `query ($genre: String, $year: Int) { Page(perPage: 50) { media(type: ANIME genre_in: [$genre] seasonYear: $year) ${STATIC_DATA} }`;

const QUERY_SORT = (
  sortMethod:
    | "POPULARITY_DESC"
    | "TRENDING_DESC"
    | "FAVOURITES_DESC"
    | "START_DATE_DESC"
    | "SCORE_DESC"
) => {
  return `query { Page(perPage: 50) { media(type: ANIME, sort: ${sortMethod}) ${STATIC_DATA} }`;
};

const QUERY_RECOMMENDATION = `query ($id: Int) { Media(id: $id, type: ANIME) { id title { romaji english native } 
recommendations (sort: RATING_DESC, perPage: 10) { nodes { id rating mediaRecommendation { id title { romaji english native } 
description source season seasonYear genres episodes status format duration averageScore popularity favourites 
studios(isMain: true) { nodes { name id } } nextAiringEpisode { airingAt timeUntilAiring episode } format 
coverImage {extraLarge large medium}  } } } } }`;

const QUERY_RELATIONS = `query ($id: Int){ Media(id: $id, type: ANIME) ${STATIC_DATA} `;

// fetch one anime
async function fetchOneAnimeData({
  anime_id,
}: {
  anime_id: number;
}): Promise<CustomResponse> {
  if (!anime_id) return MISSING_REQUIREMENT;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: {
          id: anime_id,
        },
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Media);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// fetch all anime py page and number
async function fetchAnimeDataList({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) {
  if (!page || !perPage) return MISSING_REQUIREMENT;

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_ALL,
        variables: {
          page: page,
          perPage: perPage,
        },
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Page.media);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// fetch for searching the anime
async function fetchSearchAnimeDataList({ query }: { query: string }) {
  if (!query) return MISSING_REQUIREMENT;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_SEARCH,
        variables: {
          search: query,
        },
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Page.media);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// fetch with genres and years
async function fetchGenresAnimeDataList({
  genre,
  year,
}: {
  genre: string;
  year: number;
}) {
  if (!genre || !year) return MISSING_REQUIREMENT;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_FILTER,
        variables: {
          genre: genre,
          year: year,
        },
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Page.media);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// fetch anime sorted by
async function fetchSortedAnimeDataList(
  sortMethod:
    | "POPULARITY_DESC"
    | "TRENDING_DESC"
    | "FAVOURITES_DESC"
    | "START_DATE_DESC"
    | "SCORE_DESC"
) {
  if (!sortMethod) return MISSING_REQUIREMENT;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_SORT(sortMethod),
        variables: {},
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Page.media);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

// fetch recommended anime
async function fetchRecommendedForAnimeDataList({ id }: { id: number }) {
  if (!id) return MISSING_REQUIREMENT;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_RECOMMENDATION,
        variables: {
          id: id,
        },
      }),
    });

    const data = await res.json();

    const hello = data.data.Media.recommendations.nodes;
    console.log("list" + hello);

    return TASK_COMPLETE(data.data.Media.recommendations.nodes);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

async function fetchRelationsForAnimeDataList({ id }: { id: number }) {
  if (!id) return MISSING_REQUIREMENT;

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: QUERY_RELATIONS,
        variables: {
          id: id,
        },
      }),
    });

    const data = await res.json();

    return TASK_COMPLETE(data.data.Media.relations.edges);
  } catch (error) {
    if (error instanceof Error) return TASK_FAILED(error);
  }
  return UNKNOWN_ERROR;
}

export {
  fetchOneAnimeData,
  fetchAnimeDataList,
  fetchSearchAnimeDataList,
  fetchGenresAnimeDataList,
  fetchSortedAnimeDataList,
  fetchRecommendedForAnimeDataList,
  fetchRelationsForAnimeDataList,
};
