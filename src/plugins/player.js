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
      // loadById(id) {
      //   bus.$emit('load', id);
      // },
      loadPlaylist(idList, startIndex) {
        bus.$emit('loadPlaylist', idList, startIndex);
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
      // onLoadById(fn) {
      //   bus.$on('load', fn);
      // },
      onLoadPlaylist(fn) {
        bus.$on('loadPlaylist', fn);
      },
    };
  },
}