export const useStore = defineStore("store", {
  state: () => {
    return {
      movie: {
        heroBlock: {},
        popular: [],
        nowPlaying: [],
        topRated: [],
        upcoming: [],
      },
      tv: {
        heroBlock: {},
        popular: [],
        topRated: [],
      },
      isSearchDialogShow: false,
    };
  },
});
