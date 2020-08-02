<template>
  <div class="player">
    <div v-if="isNecessary" class="youtube-wrap">
      <youtube
        @playing="ready"
        @ended="ended"
        @paused="paused"
        ref="youtube"
      />
    </div>
  </div>
</template>

<script>
import { bus } from '@/main.js';

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
    ready() {
      this.$player({event: 'ready'});
    },
    ended() {
      this.$player({event: 'ended'});
    },
    paused() {
      this.$player({event: 'paused'});
    },
  },
  mounted() {
    bus.$on('play', () => {
      this.player.playVideo();
    });
    bus.$on('pause', () => {
      this.player.pauseVideo();
    });
    bus.$on('load', id => {
      !this.isNecessary && (this.isNecessary = true);
      this.$nextTick(() => {
        this.player.loadVideoById(id);
      })
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