<template>
  <div v-if="list.items && list.items.length" class="tracks-list">
    <div class="tracks-list-header">
      <h3 class="tracks-list-title">{{ title }}</h3>
      <div class="round-btn tracks-list-header-btn" @click="loadPlaylist">
        <i class="material-icons">play_arrow</i>
      </div>
    </div>

    <div
      v-for="(item, index) in list.items"
      :key="item.id"
      @click="playToggle(item.id, index)"
      class="tracks-list-item"
      :class="{active: item.id === currentTrackId}"
    >
      <div class="round-btn tracks-list-item-play">
        <transition mode="out-in">
          <img
            v-if="thisTrackIsLoading(item.id)"
            key="loading"
            src="../assets/img/loader.svg"
            alt="loading"
            data-invert="true"
          >
          <img
            v-else-if="thisTrackIsPlaying(item.id)"
            key="playing"
            src="../assets/img/bars.svg"
            alt="playing"
            data-invert="true"
          >
          <i v-else class="material-icons">play_arrow</i>
        </transition>
      </div>
      <div
        class="tracks-list-item-preview"
        :style="`background: url(${item.previewUrl});`"
      />
      <CropText class="tracks-list-item-title" :text="item.title"/>
    </div>

    <img
      v-if="loadMoreLoading"
      class="track-list-load-more-loading"
      src="../assets/img/loader.svg"
      alt="loading"
      data-invert="true"
    >
    <button
      v-else-if="list.nextPageToken || nextPageExists"
      class="btn track-list-load-more"
      @click="loadMore"
    >
      Load more
    </button>
  </div>
</template>

<script>
import CropText from '@/components/app/CropText';
import { mapGetters, mapActions } from 'vuex';
import { SEARCH, SEARCH_LOAD_MORE } from '@/consts';

export default {
  components: { CropText },
  props: {
    title: {
      required: true,
      type: String,
    },
    list: {
      required: true,
      type: Object,
    },
    loadMoreFn: {
      type: Function,
    },
    nextPageExists: {
      type: Boolean,
    }
  },
  data() {
    return {
      loadMoreLoading: false,
    };
  },
  computed: {
    ...mapGetters([
      'isPlayerLoading',
      'isPlayerPlaying',
      'currentTrackId',
    ]),
    thisTrackIsLoading() {
      return id => id === this.currentTrackId && this.isPlayerLoading;
    },
    thisTrackIsPlaying() {
      return id => id === this.currentTrackId && this.isPlayerPlaying;
    },
    trackIdList() {
      return this.list.items.map(item => item.id);
    }
  },
  methods: {
    ...mapActions({
      search: SEARCH,
    }),
    playToggle(id, index) {
      if(this.thisTrackIsLoading(id) || this.thisTrackIsPlaying(id)) {
        this.$player.pause();
      } else if(id === this.currentTrackId) {
        this.$player.play();
      } else {
        this.$player.loadPlaylist(this.trackIdList, index);
      }
    },
    loadPlaylist() {
      this.$player.loadPlaylist(this.trackIdList, 0);
    },
    loadMore() {
      this.loadMoreLoading = true;
      const scrollY = window.scrollY;

      if(this.loadMoreFn) {
        this.loadMoreFn()
        .then(() => {
          this.loadMoreLoading = false;
          window.scrollTo(0, scrollY);
        });
      } else {
        const params = {
          title: this.list.searchTitle,
          pageToken: this.list.nextPageToken,
        };
        this.search({ params, mutation: SEARCH_LOAD_MORE })
        .then(() => {
          this.loadMoreLoading = false;
          window.scrollTo(0, scrollY);
        });
      }
    },
  },
}
</script>

<style scoped>
.tracks-list {
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  background: var(--primary);
  margin-bottom: 15px;
}
.tracks-list:last-child {
  margin: 0;
}
.tracks-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--secondary-light);
  padding: 8px 15px;
}
.tracks-list-header-btn {
  width: 42px;
  height: 42px;
}
.tracks-list-header-btn i {
  font-size: 30px;
}
.tracks-list-title {
  margin: 0;
}
.tracks-list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 14px;
  transition: .2s;
  cursor: pointer;
}
.tracks-list-item:first-child {
  margin-top: 10px;
}
.tracks-list-item:last-child {
  margin-bottom: 10px;
}
.tracks-list-item:hover {
  background: var(--primary-dark);
}
.tracks-list-item:active {
  background: var(--primary-light);
}
.tracks-list-item.active {
  background: var(--primary-dark);
}
.tracks-list-item-play {
  flex-shrink: 0;
}
.tracks-list-item-preview {
  flex-shrink: 0;
  margin: 0 13px 0 20px;
  width: 70px;
  height: 70px;
  background-size: 125px !important;
  background-position: 50% !important;
  border-radius: 50px;
}
.tracks-list-item-title {
  transition: .2s;
  user-select: none;
}
.tracks-list-item:hover .tracks-list-item-title {
  margin-left: 5px;
}
.track-list-load-more-loading {
  margin: 10px 0 20px 0;
}
.track-list-load-more {
  margin: 10px 0 20px 0;
  align-self: center;
}

@media (hover: none) {
  .tracks-list-item-title {
    transition: 0s;
  }
  .tracks-list-item:hover .tracks-list-item-title {
    margin-left: 0px;
  }
}

@media screen and (max-width: 460px) {
  .tracks-list-item {
    padding: 10px;
  }
  .tracks-list-item-preview {
    margin: 0 9px 0 16px;
    width: 63px;
    height: 63px;
  }
}

.v-enter,
.v-leave-to {
  transform: scale(.2);
}
.v-enter-active,
.v-leave-active {
  transition: .1s;
}
</style>