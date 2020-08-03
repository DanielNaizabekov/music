import { SEARCH } from '@/consts';

const state = {
  searchList: {},
  playerLoading: false,
  playerPlaying: false,
};
const getters = {
  isPlayerLoading: s => s.playerLoading,
  isPlayerPlaying: s => s.playerPlaying,
  [SEARCH]: s => s.searchList,
};
const actions = {
  [SEARCH]({ dispatch }, { params }) {
    dispatch('HTTP_GET', { method: SEARCH, params })
  },
}
const mutations = {
  changePlayerLoadingState(state, loadingState) {
    state.playerLoading = loadingState;
  },
  changePlayerPlayingState(state, playingState) {
    state.playerPlaying = playingState;
  },
  [SEARCH](state, data) {
    // localStorage.setItem( 'list', JSON.stringify(data) );
    state.searchList = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}