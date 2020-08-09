<template>
  <div class="home">
    <div class="header" :class="{scale: isThemeChanging}">
      <Search class="header-search"/>
      <Switcher @change="switchTheme"/>
    </div>
    <div class="lists-wrap" :class="{scale: isThemeChanging}">
      <TracksList title="Search results" :list="searchList"/>
      <RecomendationList/>
    </div>
    <Controller class="home-controller" :class="{scale: isThemeChanging}"/>
    <Player/>
  </div>
</template>

<script>
import Search from '../components/Search';
import TracksList from '../components/TracksList';
import RecomendationList from '../components/RecomendationList';
import Controller from '../components/Controller';
import Player from '../components/Player';
import Switcher from '../components/Switcher';
import { mapGetters, mapMutations } from 'vuex';
import { SEARCH } from '@/consts';

export default {
  props: {
    isThemeChanging: {
      type: Boolean,
      default: false,
    },
  },
  components: { Search, TracksList, RecomendationList, Controller, Player, Switcher },
  computed: {
    ...mapGetters({
      searchList: SEARCH,
    }),
  },
  methods: {
    ...mapMutations(['switchTheme']),
  },
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--primary-light);
  padding: 10px 15px;
}
.header {
  position: fixed;
  z-index: 10;
  width: calc(100% - 30px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-search {
  flex: 1;
  max-width: 500px;
  margin-right: 20px;
}
.lists-wrap {
  margin: 55px 0 86px 0;
}
.header,
.lists-wrap,
.home-controller {
  transition: transform .3s linear;
}
.header.scale,
.home-controller.scale {
  transform: scale(1.06);
}
.lists-wrap.scale {
  transform: scale(1.08);
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
  .header {
    width: calc(100% - 20px);
  }
  .lists-wrap {
    margin: 55px 0 116px 0;
  }
}
</style>