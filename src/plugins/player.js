import { bus } from '@/main';

export default {
  install(Vue) {
    Vue.prototype.$player = {
      play() {
        bus.$emit('play');
      },
      pause() {
        bus.$emit('pause');
      },
      prevTrack() {
        bus.$emit('prevTrack');
      },
      nextTrack() {
        bus.$emit('nextTrack');
      },
      started(event) {
        bus.$emit('started', event);
      },
      // loadById(id) {
      //   bus.$emit('load', id);
      // },
      loadPlaylist(idList, startIndex) {
        bus.$emit('loadPlaylist', idList, startIndex);
      },
      timeupdate(playerData) {
        bus.$emit('timeupdate', playerData);
      },
      seekTo(time) {
        bus.$emit('seekTo', time);
      },
      setVolume(volume) {
        bus.$emit('setVolume', volume);
      },


      onPlay(fn) {
        bus.$on('play', fn);
      },
      onPause(fn) {
        bus.$on('pause', fn);
      },
      onPrevTrack(fn) {
        bus.$on('prevTrack', fn);
      },
      onNextTrack(fn) {
        bus.$on('nextTrack', fn);
      },
      onStarted(fn) {
        bus.$on('started', fn);
      },
      // onLoadById(fn) {
      //   bus.$on('load', fn);
      // },
      onLoadPlaylist(fn) {
        bus.$on('loadPlaylist', fn);
      },
      onTimeupdate(fn) {
        bus.$on('timeupdate', fn);
      },
      onSeekTo(fn) {
        bus.$on('seekTo', fn);
      },
      onSetVolume(fn) {
        bus.$on('setVolume', fn);
      },
    };
  },
}