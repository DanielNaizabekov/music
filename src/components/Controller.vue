<template>
  <div class="controller">
    <div class="controller-left" :class="{disabled: !currentTrackId}">
      <div @click="skipPrev" class="controller-round-btn">
        <i class="material-icons">skip_previous</i>
      </div>
      <div @click="togglePlay" class="controller-round-btn controller-round-btn-play">
        <i v-if="isPlayerPlaying" class="material-icons">pause</i>
        <i v-else class="material-icons">play_arrow</i>
      </div>
      <div @click="skipNext" class="controller-round-btn">
        <i class="material-icons">skip_next</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'currentTrackId',
      'isPlayerLoading',
      'isPlayerPlaying',
    ]),
  },
  methods: {
    skipPrev() {
      this.$player.prevTrack();
    },
    togglePlay() {
      if(this.isPlayerLoading || this.isPlayerPlaying) {
        this.$player.pause();
      } else {
        this.$player.play();
      }
    },
    skipNext() {
      this.$player.nextTrack();
    },
  },
}
</script>

<style scoped>
.controller {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  background: #121212;
  display: flex;
  padding: 0 15px;
}
.controller-round-btn {
  color: #fff;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.controller-round-btn:hover {
  background: #373737;
}
.controller-round-btn:active {
  background: #4D4D4D;
}
.controller-left {
  display: flex;
  align-items: center;
}
.controller-left.disabled .controller-round-btn {
  color: #4D4D4D;
  pointer-events: none;
}
.controller-round-btn-play {
  margin: 0 8px;
  width: 43px;
  height: 43px;
}
.controller-round-btn-play i {
  font-size: 32px;
}
</style>