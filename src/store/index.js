import Vue from 'vue';
import Vuex from 'vuex';
import { LIGHT_THEME, DARK_THEME } from '@/consts';
import requester from './requester';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: '',
  },
  getters: {
    theme: s => s.theme,
  },
  mutations: {
    switchTheme(state) {
      state.theme = state.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    },
  },
  actions: requester,
  modules: {
    player,
  }
});