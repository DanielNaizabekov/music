<template>
  <div class="controller" :class="{disabled: !currentTrackId}">
    <div class="controller-left">
      <div @click="skipPrev" class="round-btn controller-round-btn">
        <i class="material-icons">skip_previous</i>
      </div>
      <div @click="togglePlay" class="round-btn controller-round-btn controller-round-btn-play">
        <i v-if="isPlayerPlaying" class="material-icons">pause</i>
        <i v-else class="material-icons">play_arrow</i>
      </div>
      <div @click="skipNext" class="round-btn controller-round-btn">
        <i class="material-icons">skip_next</i>
      </div>
    </div>

    <div class="controller-center">
      <CropText class="controller-center-title" :text="trackName"/>
      <div class="controller-slider">
        <span class="controller-slider-counter">{{ currentTime | MMSS }}</span>
        <Slider :value="sliderCurrentWidth" @input="trackSeek"/>
        <span class="controller-slider-counter">{{ trackDuration | MMSS }}</span>
      </div>
    </div>

    <div class="controller-right">
      <HoverCard class="controller-volume-slider-desktop">
        <Slider :value="currentVolume" @input="volumeSeek" style="width: 200px"/>
        <template #activator>
          <div @click="mute" class="round-btn controller-round-btn">
            <transition mode="out-in">
              <i v-if="currentVolume === 0" key="mute" class="material-icons">volume_mute</i>
              <i v-else key="unmute" class="material-icons">volume_up</i>
            </transition>
          </div>
        </template>
      </HoverCard>
      <div class="controller-volume-slider-mobile">
        <i class="material-icons">volume_mute</i>
        <Slider :value="currentVolume" @input="volumeSeek"/>
        <i class="material-icons">volume_up</i>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/app/Slider';
import CropText from '@/components/app/CropText';
import HoverCard from '@/components/app/HoverCard';
import { mapGetters } from 'vuex';

export default {
  components: { Slider, CropText, HoverCard },
  data() {
    return {
      trackName: 'Track',
      trackDuration: '',
      currentTime: '',
      trackSeekTimer: null,
      isTrackSliderDragging: false,
      currentVolume: '',
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
    trackSeek(offsetXPercent) {
      this.isTrackSliderDragging = true;
      clearTimeout(this.trackSeekTimer);

      const searchingTime = this.getSearchingTime(offsetXPercent);
      this.trackSeekTimer = setTimeout(() => {
        this.$player.seekTo(searchingTime);
        this.isTrackSliderDragging = false;
      }, 500);
    },
    volumeSeek(offsetXPercent) {
      this.currentVolume = offsetXPercent;
      this.$player.setVolume(offsetXPercent);
    },
    mute() {
      if(this.currentVolume === 0) {
        this.currentVolume = 50;
        this.$player.setVolume(50);
      } else {
        this.currentVolume = 0;
        this.$player.setVolume(0);
      }
    },
  },
  mounted() {
    this.$player.onStarted(playerData => {
      this.trackName = playerData.getVideoData().title;
      this.trackDuration = playerData.getDuration();
      this.currentVolume = playerData.getVolume();
    });
    this.$player.onTimeupdate(playerData => {
      playerData.getCurrentTime().then(response => {
        if(!this.isTrackSliderDragging) this.currentTime = response;
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
  background: var(--primary-dark);
  display: flex;
  padding: 18px 15px;
  border-top: 1px solid var(--secondary-light);
}
.controller.disabled {
  color: var(--secondary-light);
  pointer-events: none;
}
.controller-round-btn {
  background: transparent;
}
.controller-left {
  display: flex;
  align-items: center;
  flex-shrink: 0;
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
  padding: 0 37px 1px 37px;
  max-width: 600px;
  margin: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
.controller-center-title {
  margin: 0 0 15px 0;
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
  color: var(--contrast-light);
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
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.controller-volume-slider-mobile {
  display: none;
  align-items: center;
  width: 100%;
  max-width: 250px;
}
.controller-volume-slider-mobile i {
  font-size: 20px;
}
.controller-volume-slider-mobile i:first-child {
  margin-right: 7px;
}
.controller-volume-slider-mobile i:last-child {
  margin-left: 7px;
}

@media screen and (max-width: 900px) {
  .controller-center {
    margin: 0 30px;
  }
}
@media screen and (max-width: 650px) {
  .controller {
    flex-wrap: wrap;
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
  .controller-volume-slider-desktop {
    display: none;
  }
  .controller-volume-slider-mobile {
    display: flex;
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
.v-enter,
.v-leave-to {
  transform: scale(.2);
}
.v-enter-active,
.v-leave-active {
  transition: .1s;
}
</style>