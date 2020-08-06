<template>
  <div class="controller" :class="{disabld: !currentTrackId}">
    <div class="controller-left">
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

    <div class="controller-center">
      <h4 class="controller-center-title">{{ trackName }}</h4>
      <div class="controller-slider">
        <span class="controller-slider-counter">{{ currentTime | MMSS }}</span>
        <Slider
          @startDrag="startTrackSeek"
          @dragging="trackSeek"
          :currentWidth="sliderCurrentWidth"
        />
        <span class="controller-slider-counter">{{ trackDuration | MMSS }}</span>
      </div>
    </div>

    <div class="controller-right"></div>
  </div>
</template>

<script>
import Slider from '@/components/Slider';
import { mapGetters } from 'vuex';

export default {
  components: { Slider },
  data() {
    return {
      trackName: 'Track',
      trackDuration: '',
      currentTime: '',
      trackSeekTimer: null,
      isSliderDragging: false,
    };
  },
  computed: {
    ...mapGetters([
      'currentTrackId',
      'isPlayerLoading',
      'isPlayerPlaying',
    ]),
    sliderCurrentWidth() {
      return this.currentTime / this.trackDuration * 100;
    },
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
    getSearchingTime(offsetXPercent) {
      const searchingTime = this.trackDuration * offsetXPercent / 100;
      return this.currentTime = searchingTime;
    },
    startTrackSeek(offsetXPercent) {
      this.isSliderDragging = true;
      this.getSearchingTime(offsetXPercent);
      this.$player.seekTo(this.currentTime);
    },
    trackSeek(offsetXPercent) {
      this.isSliderDragging = true;
      clearTimeout(this.trackSeekTimer);

      this.getSearchingTime(offsetXPercent);
      this.trackSeekTimer = setTimeout(() => {
        this.$player.seekTo(this.currentTime);
        this.isSliderDragging = false;
      }, 500);
    },
  },
  mounted() {
    this.$player.onStarted(playerData => {
      this.trackName = playerData.getVideoData().title;
      this.trackDuration = playerData.getDuration();
    });
    this.$player.onTimeupdate(playerData => {
      playerData.getCurrentTime().then(response => {
        if(!this.isSliderDragging) this.currentTime = response;
      });
    });
  },
  filters: {
    MMSS(v) {
      return new Date(v * 1000).toISOString().substr(14, 5);
    },
  },
}
</script>

<style scoped>
.controller {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #121212;
  display: flex;
  flex-wrap: wrap;
  padding: 18px 15px;
  color: #fff;
}
.controller.disabled .controller-round-btn,
.controller.disabled .controller-center {
  color: #4D4D4D;
  pointer-events: none;
}
.controller-round-btn {
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
.controller-round-btn-play {
  margin: 0 8px;
  width: 43px;
  height: 43px;
}
.controller-round-btn-play i {
  font-size: 32px;
}
.controller-center {
  flex-grow: 1;
  padding: 0 37px;
  max-width: 600px;
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.controller-center-title {
  margin: 0;
  margin-bottom: 15px;
  font-weight: 100;
}
.controller-slider {
  position: relative;
  display: flex;
  align-items: center;
}
.controller-slider-counter {
  position: absolute;
  font-size: 11px;
  font-family: Arial;
  color: #ccc;
}
.controller-slider-counter:first-child {
  left: 0;
  transform: translateX(calc(-100% - 10px));
}
.controller-slider-counter:last-child {
  right: 0;
  transform: translateX(calc(100% + 10px));
}

.controller-right {
  margin-left: auto;
  width: 80px;
  /* height: 80px; */
  /* background: #181818; */
}

@media screen and (max-width: 900px) {
  .controller-center {
    margin: 0 30px;
  }
}
@media screen and (max-width: 650px) {
  .controller {
    padding: 10px 15px;
  }
  .controller-center {
    min-width: 100%;
    order: -1;
    margin: 0 0 10px 0;
  }
  .controller-center-title {
    margin-bottom: 13px;
  }
  .controller-right {
    flex-grow: 1;
  }
}
@media screen and (max-width: 460px) {
  .controller {
    padding: 10px;
  }
  .controller-round-btn {
    width: 38px;
    height: 38px;
  }
  .controller-round-btn i {
    font-size: 28px;
  }
  .controller-round-btn-play {
    margin: 0 6px;
    width: 45px;
    height: 45px;
  }
  .controller-round-btn-play i {
    font-size: 34px;
  }
}


.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  /* display: none; */
}
/* .slider-overlay.active {
  display: block;
} */
</style>