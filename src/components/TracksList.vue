<template>
  <div v-if="list.items && list.items.length" class="tracks-list">
    <h3 class="tracks-list-title">{{ title }}</h3>
    <div
      v-for="(item, i) in list.items"
      :key="item.etag + i"
      @click="playToggle(item.id.videoId)"
      class="tracks-list-item"
      :class="{active: item.id.videoId === currentTrack}"
    >
      <div class="tracks-list-item-play">
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
        class="tracks-list-item-preview"
        :style="`background: url(${item.snippet.thumbnails.default.url});`"
      />
      <span class="tracks-list-item-title">{{ item.snippet.title }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    list: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentTrack: '',
    };
  },
  computed: {
    ...mapGetters(['isPlayerLoading', 'isPlayerPlaying']),
    thisTrackIsLoading() {
      return id => id === this.currentTrack && this.isPlayerLoading;
    },
    thisTrackIsPlaying() {
      return id => id === this.currentTrack && this.isPlayerPlaying;
    },
  },
  methods: {
    playToggle(id) {
      if(this.thisTrackIsLoading(id) || this.thisTrackIsPlaying(id)) {
        this.$player.pause();
      } else if(id === this.currentTrack) {
        this.$player.play();
      } else {
        this.$player.loadById(id)
        this.currentTrack = id;
      }
    },
  },
}
</script>

<style scoped>
.tracks-list {
  border-radius: 20px;
  overflow: hidden;
  background: #181818;
}
.tracks-list-title {
  color: #fff;
  border-bottom: 1px solid #4C4C4C;
  padding: 15px;
  margin: 0;
}
.tracks-list-item {
  display: flex;
  align-items: center;
  color: #fff;
  padding: 10px 15px;
  font-size: 14px;
  transition: .2s;
  cursor: pointer;
}
.tracks-list-item:first-child {
  margin-top: 10px;
}
.tracks-list-item:last-child {
  margin-bottom: 10px;
}
.tracks-list-item:hover {
  background: #121212;
}
.tracks-list-item:active {
  background: #202020;
}
.tracks-list-item.active {
  background: #121212;
}
.tracks-list-item-play {
  flex-shrink: 0;
  border-radius: 50px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #373737;
}
.tracks-list-item-play:hover {
  background: #4D4D4D;
}
.tracks-list-item-preview {
  flex-shrink: 0;
  margin: 0 13px 0 20px;
  width: 70px;
  height: 70px;
  background-size: 125px !important;
  background-position: 50% !important;
  border-radius: 50px;
}
.tracks-list-item-title {
  transition: .2s;
}
.tracks-list-item:hover .tracks-list-item-title {
  margin-left: 5px;
}
@media (hover: none) {
  .tracks-list-item-title {
    transition: 0s;
  }
  .tracks-list-item:hover .tracks-list-item-title {
    margin-left: 0px;
  }
}

@media screen and (max-width: 460px) {
  .tracks-list-item {
    padding: 10px;
  }
  .tracks-list-item-preview {
    margin: 0 9px 0 16px;
    width: 63px;
    height: 63px;
  }
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