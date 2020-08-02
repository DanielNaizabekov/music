import Vue from 'vue';
import Vuex from 'vuex';
import requester from './requester';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: requester,
  modules: {
    player,
  }
});