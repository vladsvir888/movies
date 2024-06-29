export const LISTS = {
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
};

export const FILTER_VALUES = {
  with_genres: "with_genres",
  sort_by: "sort_by",
  "vote_average.gte": "vote_average.gte",
  "release_date.gte": "release_date.gte",
  "release_date.lte": "release_date.lte",
};
