import YouTubePlayer from "youtube-player";

const getDefaultState = () => {
  return {
    videos: [],
    activeVideoId: null,
  };
};

const STATE_CHANGE_VALUES = {
  playing: 1,
};

export const useVideo = defineStore("video", {
  state: () => getDefaultState(),

  actions: {
    createVideo(element, videoId) {
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

    stopVideo() {
      this.videos.forEach((video) => {
        if (video.id !== this.activeVideoId) {
          video.video.pauseVideo();
        }
      });
    },

    stopAllVideos() {
      this.videos.forEach((video) => video.video.pauseVideo());
    },

    resetState() {
      Object.assign(this, getDefaultState());
    },
  },
});
