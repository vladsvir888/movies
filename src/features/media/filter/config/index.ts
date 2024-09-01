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

export type SortOrdersKeys = keyof typeof SORT_ORDERS;
export const SORT_ORDERS = {
  desc: "desc",
  asc: "asc",
} as const;

export const FILTER_VALUES = {
  with_genres: "with_genres",
  sort_by: "sort_by",
  vote_average_gte: "vote_average.gte",
  release_date_gte: "release_date.gte",
  release_date_lte: "release_date.lte",
} as const;

export type TFilter = {
  [FILTER_VALUES.with_genres]: string;
  [FILTER_VALUES.sort_by]: string | undefined;
  [FILTER_VALUES.vote_average_gte]: number | undefined;
  [FILTER_VALUES.release_date_gte]: string | undefined;
  [FILTER_VALUES.release_date_lte]: string | undefined;
};
export type FilterKeys = keyof TFilter;
export const FILTER = {
  [FILTER_VALUES["with_genres"]]: "",
  [FILTER_VALUES["sort_by"]]: undefined,
  [FILTER_VALUES["vote_average_gte"]]: undefined,
  [FILTER_VALUES["release_date_gte"]]: undefined,
  [FILTER_VALUES["release_date_lte"]]: undefined,
} as TFilter;
