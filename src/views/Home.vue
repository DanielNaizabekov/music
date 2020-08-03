<template>
  <div class="home">
    <Search/>
    <div class="lists-wrap">
      <TracksList title="Search results" :list="searchList"/>
      <TracksList title="Recomendations" :list="recomendationList"/>
    </div>
    <Player/>
  </div>
</template>

<script>
import Search from '../components/Search';
import TracksList from '../components/TracksList';
import Player from '../components/Player';
import { mapGetters, mapActions } from 'vuex';
import { SEARCH, RECOMENDATIONS } from '@/consts';
import recomendationIdList from '@/utils/recomendationIdList';

export default {
  components: { Search, Player, TracksList },
  computed: {
    ...mapGetters({
      searchList: SEARCH,
      recomendationList: RECOMENDATIONS,
    }),
  },
  methods: {
    ...mapActions({
      getRecomendations: RECOMENDATIONS,
    }),
  },
  mounted() {
    const params = {
      id: recomendationIdList,
    };
    this.getRecomendations({ params });
  },
}
</script>

<style scoped>
.home {
  min-height: 100%;
  background: #202020;
  padding: 10px 15px;
}
.lists-wrap {
  margin: 55px 0 0 0;
}

@media screen and (max-width: 460px) {
  .home {
    padding: 10px;
  }
}
</style>