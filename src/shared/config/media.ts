export type MediaTypes = "movie" | "tv";

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

export type MediaTypesTuple = ["movie", "tv"];
