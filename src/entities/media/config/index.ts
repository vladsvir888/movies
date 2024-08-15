import type { MediaList, MediaTypesTuple } from "~/src/shared/config";

export const MEDIA_LIST = {
  movie: [
    {
      type: "movie",
      category: "popular",
      title: "Popular Movies",
    },
    {
      type: "movie",
      category: "now_playing",
      title: "Now Playing Movies",
    },
    {
      type: "movie",
      category: "top_rated",
      title: "Top Rated Movies",
    },
    {
      type: "movie",
      category: "upcoming",
      title: "Upcoming Movies",
    },
  ],
  tv: [
    {
      type: "tv",
      category: "popular",
      title: "Popular TV Shows",
    },
    {
      type: "tv",
      category: "top_rated",
      title: "Top Rated TV Shows",
    },
  ],
} as MediaList;

export const MEDIA_TYPES = Object.keys(MEDIA_LIST) as MediaTypesTuple;
