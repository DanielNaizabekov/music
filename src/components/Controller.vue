<template>
  <div class="controller" :class="{disabled: !currentTrackId}">
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
      <div
        @mousedown="startTrackSeek"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
        class="controller-slider-wrap"
        :class="{active: isMouseDown}"
        ref="sliderWrap"
      >
        <span class="controller-slider-counter">{{ currentTime | MMSS }}</span>
        <div class="controller-slider">
          <div :style="`width: ${sliderCurrentWidth}%`" class="controller-slider-inner"/>
        </div>
        <div :style="`left: ${sliderCurrentWidth}%`" class="controller-slider-tracker"></div>
        <span class="controller-slider-counter">{{ trackDuration | MMSS }}</span>
      </div>
    </div>

    <div class="controller-right"></div>

    <div
      v-show="isMouseDown"
      @mousemove="trackSeek"
      @mouseup="finishTrackSeek"
      class="slider-overlay"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      trackName: 'Track',
      trackDuration: '',
      currentTime: '',
      sliderWrap: null,
      isMouseDown: false,
      trackSeekTimer: null,
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
    getSearchingTime(offsetX) {
      const offsetPercent = offsetX / this.sliderWrap.offsetWidth * 100;
      const searchingTime = this.trackDuration * offsetPercent / 100;
      return this.currentTime = searchingTime;
    },
    startTrackSeek(event) {
      this.isMouseDown = true;
      const searchingTime = this.getSearchingTime(event.offsetX);
      this.$player.seekTo(searchingTime);
    },
    trackSeek(event) {
      clearTimeout(this.trackSeekTimer);

      const offsetX = event.offsetX - this.sliderWrap.offsetLeft;
      if(offsetX < 0 || offsetX > this.sliderWrap.offsetWidth) return;
      const searchingTime = this.getSearchingTime(offsetX);

      this.trackSeekTimer = setTimeout(() => {
        this.$player.seekTo(searchingTime);
      }, 500);
    },
    finishTrackSeek() {
      this.isMouseDown = false;
    },
    touchstart() {
      this.isMouseDown = true;
    },
    touchmove(event) {
      clearTimeout(this.trackSeekTimer);

      const offsetX = event.touches[0].clientX - this.sliderWrap.offsetLeft;
      if(offsetX < 0 || offsetX > this.sliderWrap.offsetWidth) return;
      const searchingTime = this.getSearchingTime(offsetX);

      this.trackSeekTimer = setTimeout(() => {
        this.$player.seekTo(searchingTime);
      }, 500);
    },
    touchend() {
      this.isMouseDown = false;
    },
  },
  mounted() {
    this.$player.onStarted(playerData => {
      this.trackName = playerData.getVideoData().title;
      this.trackDuration = playerData.getDuration();
    });
    this.$player.onTimeupdate(playerData => {
      playerData.getCurrentTime().then(response => {
        if(!this.isMouseDown) this.currentTime = response;
      });
    });
    this.sliderWrap = this.$refs.sliderWrap;
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
  padding: 0 35px;
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
.controller-slider-wrap {
  display: flex;
  align-items: center;
  position: relative;
  padding: 5px 0;
  cursor: pointer;
}
.controller-slider-wrap:hover .controller-slider,
.controller-slider-wrap.active .controller-slider {
  transform: scaleY(1.8);
}
.controller-slider-counter {
  position: absolute;
  font-size: 11px;
  font-family: Arial;
  color: #ccc;
}
.controller-slider-counter:first-child {
  left: 0;
  transform: translateX(calc(-100% - 7px));
}
.controller-slider-counter:last-child {
  right: 0;
  transform: translateX(calc(100% + 7px));
}
.controller-slider {
  width: 100%;
  height: 3px;
  background: #4D4D4D;
  transition: .1s;
}
.controller-slider-inner {
  height: 100%;
  width: 0;
  background: #ccc;
}
.controller-slider-tracker {
  width: 13px;
  height: 13px;
  border-radius: 50px;
  background: #ccc;
  position: absolute;
  transform: translateX(-50%) scale(0);
  transition: transform .1s;
}
.controller-slider-wrap:hover .controller-slider-tracker,
.controller-slider-wrap.active .controller-slider-tracker {
  transform: translateX(-50%) scale(1);
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