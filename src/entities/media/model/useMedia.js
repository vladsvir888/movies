const NAMESPACE = "media";

export const useMediaStore = defineStore(NAMESPACE, {
  state: () => {
    return {
      movie: {
        heroBlock: {},
        popular: [],
        nowPlaying: [],
        topRated: [],
        upcoming: [],
        genres: [],
      },
      tv: {
        heroBlock: {},
        popular: [],
        topRated: [],
        genres: [],
      },
    };
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot));
}
