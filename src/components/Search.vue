<template>
  <div class="search">
    <div class="search-input-wrap">
      <input
        class="search-input"
        v-model="title"
        type="text"
        placeholder="Search"
      >
      <div
        class="search-input-btn"
        @click="submit"
        :class="{disabled: !title}"
      >
        <i class="material-icons">search</i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { SEARCH } from '@/consts';

export default {
  data() {
    return {
      title: '',
    };
  },
  methods: {
    ...mapActions({
      search: SEARCH,
    }),
    submit() {
      const params = {
        title: this.title,
        type: 'video',
        pageToken: '',
      };
      this.search({ params });
    },
  },
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: center;
}
.search-input-wrap {
  border: 1px solid #767676;
  border-radius: 8px;
  width: 500px;
  display: flex;
  overflow: hidden;
}
.search-input-wrap:focus-within {
  border: 1px solid #1C62B9;
}
.search-input {
  flex-grow: 1;
  color: #fff;
  border: 0;
  padding: 8px 12px;
  background: #121212;
  outline: none;
}
.search-input-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #989898;
  background: #313131;
  padding: 0 10px;
  cursor: pointer;
}
.search-input-btn:hover {
  color: #fff;
}
.search-input-btn.disabled {
  background: #4C4C4C;
  pointer-events: none;
}
.search-input-btn i {
  display: block;
}
</style>