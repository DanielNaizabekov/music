<template>
  <div v-if="isNecessary" class="youtube-wrap">
    <youtube
      width="200"
      height="200"
      @buffering="buffering"
      @playing="started"
      @ended="ended"
      @paused="paused"
      ref="youtube"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      isNecessary: false,
      timeout: null,
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    ...mapMutations([
      'changePlayerLoadingState',
      'changePlayerPlayingState',
      'changeCurrentTrackId',
    ]),
    timeupdate() {
      this.$player.timeupdate(this.player);
      this.timeout = setTimeout(() => this.timeupdate(), 1000);
    },
    buffering(event) {
      const id = event.getVideoData().video_id;
      this.changePlayerLoadingState(true);
      this.changeCurrentTrackId(id);
    },
    started(event) {
      this.changePlayerLoadingState(false);
      this.changePlayerPlayingState(true);
      this.$player.started(event);
      if(!this.timeout) this.timeupdate();
    },
    ended() {
      this.changePlayerPlayingState(false);
      clearTimeout(this.timeout);
      this.timeout = null;
    },
    paused() {
      this.changePlayerPlayingState(false);
      clearTimeout(this.timeout);
      this.timeout = null;
    },
  },
  mounted() {
    this.$player.onPlay(() => {
      this.player.playVideo();
    });
    this.$player.onPause(() => {
      this.changePlayerLoadingState(false);
      this.player.pauseVideo();
    });
    this.$player.onPrevTrack(() => {
      this.player.previousVideo();
    });
    this.$player.onNextTrack(() => {
      this.player.nextVideo();
    });
    // this.$player.onLoadById(id => {
    //   this.changePlayerLoadingState(true);
    //   this.changeCurrentTrackId(id);
    //   !this.isNecessary && (this.isNecessary = true);
    //   this.$nextTick(() => {
    //     this.player.loadVideoById({videoId: id, suggestedQuality: 'small'});
    //   })
    // });
    this.$player.onLoadPlaylist((idList, startIndex) => {
      this.changePlayerLoadingState(true);
      this.changeCurrentTrackId(idList[startIndex]);
      if(!this.isNecessary) {
        this.isNecessary = true;
        this.$nextTick(() => {
          this.player.setLoop(true);
          this.player.loadPlaylist(idList, startIndex);
        });
      } else {
        this.player.loadPlaylist(idList, startIndex);
      }
    });
    this.$player.onSeekTo(time => {
      this.player.seekTo(time);
    });
  },
}
</script>

<style scoped>
.youtube-wrap {
  height: 0px;
  overflow: hidden;
}
</style>