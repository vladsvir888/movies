export const useStore = defineStore("store", {
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
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
}
