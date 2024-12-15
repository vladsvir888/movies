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
  "vote_average.gte": "vote_average.gte",
  "release_date.gte": "release_date.gte",
  "release_date.lte": "release_date.lte",
} as const;

export type FilterKeys = keyof typeof FILTER_VALUES;

export type TFilter = {
  [P in FilterKeys]?: string;
};
