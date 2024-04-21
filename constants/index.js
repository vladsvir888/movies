export const lists = {
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

export const sortTypes = {
  movie: [
    "popularity",
    "vote_count",
    "vote_average",
    "revenue",
    "original_title",
  ],
  tv: ["popularity", "vote_count", "vote_average", "original_name"],
};
