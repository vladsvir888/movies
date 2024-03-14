export const useStore = defineStore("store", {
  state: () => {
    return {
      movie: {
        heroBlock: {},
        popular: [],
      },
      tv: {
        popular: [],
      },
    };
  },
});
