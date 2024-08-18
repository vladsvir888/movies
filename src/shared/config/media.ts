import type { BaseVideo } from "./video";
import type { Review } from "./review";
import type { PageResult } from "./page-result";
import type { Genre } from "./genre";
import type { Image } from "./image";

export type MediaTypesTuple = ["movie", "tv"];

export type MediaTypes = MediaTypesTuple[number];

export type MediaCategories =
  | "popular"
  | "now_playing"
  | "top_rated"
  | "upcoming";

type MediaItem = {
  type: MediaTypes;
  category: MediaCategories;
  title: string;
};

export type MediaList = {
  [K in MediaTypes]: MediaItem[];
};

export type Media = {
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
  name?: string;
  videos?: {
    results: BaseVideo[];
  };
  status?: string;
  similar?: PageResult<Media>;
  runtime?: number;
  reviews?: PageResult<Review>;
  revenue?: number;
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  production_companies?: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  budget?: number;
  genres?: Genre[];
  images?: {
    backdrops: Image[];
    posters: Image[];
  };
};

export type MediaStore = {
  [K in MediaTypes]: K extends MediaTypesTuple[0]
    ? {
        heroBlock: Media;
        popular: Media[];
        nowPlaying: Media[];
        topRated: Media[];
        upcoming: Media[];
        genres: Genre[];
      }
    : {
        heroBlock: Media;
        popular: Media[];
        topRated: Media[];
        genres: Genre[];
      };
};
