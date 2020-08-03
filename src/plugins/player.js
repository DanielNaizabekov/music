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
      loadById(id) {
        bus.$emit('load', id);
      },
      onPlay(fn) {
        bus.$on('play', fn);
      },
      onPause(fn) {
        bus.$on('pause', fn);
      },
      onLoadById(fn) {
        bus.$on('load', fn);
      },
    };
  },
}