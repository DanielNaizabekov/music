import { SEARCH, RECOMENDATIONS, SEARCH_LOAD_MORE } from '@/consts';

const state = {
  searchList: {},
  recomendationList: {},
  currentTrackId: '',
  playerLoading: false,
  playerPlaying: false,
};
const getters = {
  isPlayerLoading: s => s.playerLoading,
  isPlayerPlaying: s => s.playerPlaying,
  currentTrackId: s => s.currentTrackId,
  [SEARCH]: s => s.searchList,
  [RECOMENDATIONS]: s => s.recomendationList,
};
const actions = {
  [SEARCH]({ dispatch }, { params, mutation }) {
    return dispatch('HTTP_GET', {
      method: SEARCH,
      params,
      mutation,
      mutationData: params.title
    });
  },
  [RECOMENDATIONS]({ dispatch }, { params }) {
    return dispatch('HTTP_GET', { method: RECOMENDATIONS, params });
  },
};
const mutations = {
  changePlayerLoadingState(state, loadingState) {
    state.playerLoading = loadingState;
  },
  changePlayerPlayingState(state, playingState) {
    state.playerPlaying = playingState;
  },
  changeCurrentTrackId(state, id) {
    state.currentTrackId = id;
  },
  [SEARCH](state, {data, manualData: searchTitle}) {
    const items = data.items.map(item => ({
      id: item.id.videoId,
      previewUrl: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
    }));
    const list = {
      items,
      searchTitle,
      nextPageToken: data.nextPageToken,
    };
    state.searchList = list;
  },
  [SEARCH_LOAD_MORE](state, { data }) {
    const items = data.items.map(item => ({
      id: item.id.videoId,
      previewUrl: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
    }));
    const list = {
      ...state.searchList,
      items: [...state.searchList.items, ...items],
      nextPageToken: data.nextPageToken,
    };
    list.items = list.items.filter((filterItem, index) => {
      return list.items.findIndex(findItem => filterItem.id === findItem.id) === index;
    });
    state.searchList = list;
  },
  [RECOMENDATIONS](state, {data}) {
    const items = data.items.map(item => ({
      id: item.id,
      previewUrl: item.snippet.thumbnails.default.url,
      title: item.snippet.title,
    }));
    const list = {
      ...state.recomendationList,
      items: state.recomendationList.items ? [...state.recomendationList.items, ...items] : [...items],
    };
    state.recomendationList = list;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};