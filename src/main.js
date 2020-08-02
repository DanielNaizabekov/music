import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import App from './App.vue'
import store from './store'
import player from './plugins/player.js'
import 'normalize.css/normalize.css';

export const bus = new Vue();
Vue.use(player);
Vue.use(VueYoutube);
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
