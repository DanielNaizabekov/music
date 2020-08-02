import { SEARCH } from '@/consts';

const state = {
  searchList: {},
};
const getters = {
  [SEARCH]: s => s.searchList,
};
const actions = {
  [SEARCH]({ dispatch }, { params }) {
    dispatch('HTTP_GET', { method: SEARCH, params })
  },
}
const mutations = {
  [SEARCH](state, data) {
    state.searchList = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}