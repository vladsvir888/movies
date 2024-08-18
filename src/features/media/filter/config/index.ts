export const SORT_TYPES = {
  movie: [
    "popularity",
    "vote_count",
    "vote_average",
    "revenue",
    "original_title",
  ],
  tv: ["popularity", "vote_count", "vote_average", "original_name"],
};

export const SORT_ORDERS = {
  descending: "desc",
  ascending: "asc",
};

export const FILTER_VALUES = {
  with_genres: "with_genres",
  sort_by: "sort_by",
  "vote_average.gte": "vote_average.gte",
  "release_date.gte": "release_date.gte",
  "release_date.lte": "release_date.lte",
};

export const FILTER = {
  [FILTER_VALUES["with_genres"]]: "",
  [FILTER_VALUES["sort_by"]]: "",
  [FILTER_VALUES["vote_average.gte"]]: "",
  [FILTER_VALUES["release_date.gte"]]: "",
  [FILTER_VALUES["release_date.lte"]]: "",
};
