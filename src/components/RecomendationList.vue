<template>
  <TracksList
    title="Recomendations"
    :list="recomendationList"
    :loadMoreFn="loadMore"
    :nextPageExists="!!recomendationIdList.length"
  />
</template>

<script>
import TracksList from '../components/TracksList';
import { mapGetters, mapActions } from 'vuex';
import { RECOMENDATIONS } from '@/consts';
import recomendationIdList from '@/utils/recomendationIdList';
const ITEMS_PER_PAGE = 5;

export default {
  components: { TracksList },
  data() {
    return {
      recomendationIdList: [...recomendationIdList],
    };
  },
  computed: {
    ...mapGetters({
      recomendationList: RECOMENDATIONS,
    }),
  },
  methods: {
    ...mapActions({
      getRecomendations: RECOMENDATIONS,
    }),
    loadMore() {
      const params = {
        id: this.recomendationIdList.splice(0, ITEMS_PER_PAGE),
      };
      return this.getRecomendations({ params });
    },
  },
  mounted() {
    const params = {
      id: this.recomendationIdList.splice(0, ITEMS_PER_PAGE),
    };
    this.getRecomendations({ params });
  },
}
</script>