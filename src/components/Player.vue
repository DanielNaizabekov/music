<template>
  <div class="player">
    <div v-if="isNecessary" class="youtube-wrap">
      <youtube
        @playing="started"
        @ended="ended"
        @paused="paused"
        ref="youtube"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      isNecessary: false,
    };
  },
  computed: {
    player() {
      return this.$refs.youtube.player;
    },
  },
  methods: {
    ...mapMutations(['changePlayerLoadingState', 'changePlayerPlayingState']),
    started() {
      this.changePlayerLoadingState(false);
      this.changePlayerPlayingState(true);
    },
    ended() {
      this.changePlayerPlayingState(false);
    },
    paused() {
      this.changePlayerPlayingState(false);
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
    this.$player.onLoadById(id => {
      this.changePlayerLoadingState(true);
      !this.isNecessary && (this.isNecessary = true);
      this.$nextTick(() => {
        this.player.loadVideoById(id);
      })
    })
  },
}
</script>

<style scoped>
.youtube-wrap {
  height: 0px;
  overflow: hidden;
}
</style>