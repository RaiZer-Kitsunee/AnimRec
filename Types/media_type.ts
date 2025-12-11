/* eslint-disable @typescript-eslint/no-explicit-any */
interface Media {
  id: number;
  title: MediaTitle;
  description: string;
  source: string;
  season: string | null;
  seasonYear: number | null;
  genres: string[];
  episodes: number | null;
  status: string;
  format: string;
  duration: number | null;
  averageScore: number | null;
  popularity: number;
  favourites: number;
  studios: MediaStudios;
  nextAiringEpisode: any | null;
  relations: MediaRelations;
  coverImage: MediaCoverImage;
  bannerImage: string | null;
}

interface MediaTitle {
  romaji: string;
  english: string | null;
  native: string;
}

interface MediaCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
}

interface Studio {
  id: number;
  name: string;
}

interface MediaStudios {
  nodes: Studio[];
}
