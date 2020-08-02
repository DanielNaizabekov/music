<template>
  <div class="results">
    <div
      v-for="item in results.items"
      :key="item.etag"
      @click="playToggle(item.id.videoId)"
      class="results-item"
      :class="{active: item.id.videoId === currentTrack}"
    >
      <div class="results-item-play">
        <transition mode="out-in">
          <img
            v-if="thisTrackIsLoading(item.id.videoId)"
            key="loading"
            src="../assets/img/loader.svg"
            alt="loading"
          >
          <img
            v-else-if="thisTrackIsPlaying(item.id.videoId)"
            key="playing"
            src="../assets/img/bars.svg"
            alt="playing"
          >
          <i v-else class="material-icons">play_arrow</i>
        </transition>
      </div>
      <div
        class="results-item-preview"
        :style="`background: url(${item.snippet.thumbnails.default.url});`"
      />
      <span class="results-item-title">{{ item.snippet.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SEARCH } from '@/consts';
import { bus } from '@/main';

export default {
  data() {
    return {
      currentTrack: '',
      playing: false,
      playerLoading: true,
    };
  },
  computed: {
    ...mapGetters({
      results: SEARCH,
    }),
    thisTrackIsLoading() {
      return id => id === this.currentTrack && this.playerLoading;
    },
    thisTrackIsPlaying() {
      return id => id === this.currentTrack && this.playing;
    },
  },
  methods: {
    playToggle(id) {
      if(id === this.currentTrack && this.playing) {
        this.$player({ event: 'pause' });
        this.playerLoading = false;
        this.playing = false;
      } else if(id === this.currentTrack) {
        this.$player({ event: 'play' });
        this.playing = true;
      } else {
        this.$player({ event: 'load', id });
        this.playerLoading = true;
        this.currentTrack = id;
        this.playing = true;
      }
    },
  },
  mounted() {
    bus.$on('ready', () => {
      this.playing = true;
      this.playerLoading = false;
    });
    bus.$on('ended', () => {
      this.playing = false;
    });
    bus.$on('paused', () => {
      this.playing = false;
    });
  },
}
</script>

<style scoped>
.results {
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
}
.results-item {
  display: flex;
  align-items: center;
  background: #181818;
  color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  transition: .2s;
  cursor: pointer;
}
.results-item:hover {
  background: #121212;
}
.results-item:active {
  background: #202020;
}
.results-item.active {
  background: #121212;
}
.results-item-play {
  flex-shrink: 0;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #373737;
}
.results-item-play:hover {
  background: #4D4D4D;
}
.results-item-preview {
  flex-shrink: 0;
  margin: 0 13px 0 20px;
  width: 70px;
  height: 70px;
  background-size: 125px !important;
  background-position: 50% !important;
  border-radius: 50px;
}
.results-item-title {
  transition: .2s;
}
.results-item:hover .results-item-title {
  margin-left: 5px;
}

.v-enter,
.v-leave-to {
  transform: scale(.2);
}
.v-enter-active,
.v-leave-active {
  transition: .1s;
}
</style>