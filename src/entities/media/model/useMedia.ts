import type { MediaStore } from "~/src/shared/config";

const NAMESPACE = "media";

export const useMediaStore = defineStore(NAMESPACE, {
  state: () => {
    return {
      movie: {
        heroBlock: undefined,
        popular: [],
        nowPlaying: [],
        topRated: [],
        upcoming: [],
        genres: [],
      },
      tv: {
        heroBlock: undefined,
        popular: [],
        topRated: [],
        genres: [],
      },
    } as unknown as MediaStore;
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot));
}
