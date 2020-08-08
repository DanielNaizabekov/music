<template>
  <div class="home">
    <Search/>
    <div class="lists-wrap">
      <TracksList title="Search results" :list="searchList"/>
      <RecomendationList/>
    </div>
    <Controller/>
    <Player/>
  </div>
</template>

<script>
import Search from '../components/Search';
import TracksList from '../components/TracksList';
import RecomendationList from '../components/RecomendationList';
import Controller from '../components/Controller';
import Player from '../components/Player';
import { mapGetters } from 'vuex';
import { SEARCH } from '@/consts';

export default {
  components: { Search, TracksList, RecomendationList, Controller, Player },
  computed: {
    ...mapGetters({
      searchList: SEARCH,
    }),
  },
}
</script>

<style scoped>
.home {
  min-height: 100%;
  background: #202020;
  padding: 10px 15px;
  transition: .1s;
}
.lists-wrap {
  margin: 55px 0 86px 0;
}

@media screen and (max-width: 650px) {
  .lists-wrap {
    margin: 55px 0 121px 0;
  }
}
@media screen and (max-width: 460px) {
  .home {
    padding: 10px;
  }
  .lists-wrap {
    margin: 55px 0 116px 0;
  }
}
</style>