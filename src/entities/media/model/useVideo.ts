import YouTubePlayer from "youtube-player";
import type { YouTubePlayer as YTP } from "youtube-player/dist/types";

type StringOrNull = string | null;

type VideoState = {
  videos: {
    video: YTP;
    id: StringOrNull;
  }[];
  activeVideoId: StringOrNull;
};

const NAMESPACE = "video";

const getDefaultState = (): VideoState => {
  return {
    videos: [],
    activeVideoId: null,
  };
};

const STATE_CHANGE_VALUES = {
  playing: 1,
};

export const useVideoStore = defineStore(NAMESPACE, {
  state: () => getDefaultState(),

  actions: {
    createVideo(element: string, videoId: string): void {
      const video = YouTubePlayer(element, {
        videoId,
      });

      video.on("stateChange", (event) => {
        if (event.data === STATE_CHANGE_VALUES.playing) {
          this.activeVideoId = videoId;
          this.stopVideo();
        }
      });

      this.videos.push({
        video,
        id: videoId,
      });

      video.playVideo();
    },

    stopVideo(): void {
      this.videos.forEach((video) => {
        if (video.id !== this.activeVideoId) {
          video.video.pauseVideo();
        }
      });
    },

    stopAllVideos(): void {
      this.videos.forEach((video) => video.video.pauseVideo());
    },

    resetState(): void {
      this.$reset();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useVideoStore, import.meta.hot));
}
