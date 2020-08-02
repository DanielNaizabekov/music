import { bus } from '@/main';

export default {
  install(Vue) {
    Vue.prototype.$player = function({ event, id = ''}) {
      bus.$emit(event, id);
    };
  },
}