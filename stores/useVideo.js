import YouTubePlayer from "youtube-player";

export const useVideo = defineStore("video", {
  state: () => {
    return {
      videos: [],
      activeVideoId: null,
    };
  },
  actions: {
    createVideo(element, videoId) {
      const video = YouTubePlayer(element, {
        videoId,
      });

      video.on("stateChange", (event) => {
        if (event.data === 1) {
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
      this.videos = [];
      this.activeVideoId = null;
    },
  },
});
