<template>
  <div class="search">
    <div class="search-input-wrap">
      <form class="search-form" @submit.prevent="submit">
        <input
          class="search-input"
          v-model="title"
          type="text"
          placeholder="Search"
        >
      </form>
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
      prevTitle: 'prevTitle',
    };
  },
  methods: {
    ...mapActions({
      search: SEARCH,
    }),
    submit() {
      if(this.prevTitle === this.title || !this.title) return;
      this.prevTitle = this.title;
      const params = {
        title: this.title,
        pageToken: '',
      };
      this.search({ params });
    },
  },
}
</script>

<style scoped>
.search-input-wrap {
  border: 1px solid var(--secondary-light);
  border-radius: 8px;
  display: flex;
  overflow: hidden;
}
.search-input-wrap:focus-within {
  border: 1px solid #1C62B9;
}
.search-form {
  flex-grow: 1;
}
.search-input {
  width: 100%;
  color: var(--contrast);
  border: 0;
  padding: 8px 12px;
  background: var(--primary-dark);
  outline: none;
}
.search-input-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--contrast-light);
  background: var(--secondary);
  padding: 0 10px;
  cursor: pointer;
}
.search-input-btn:hover {
  color: var(--contrast);
}
.search-input-btn.disabled {
  background: var(--secondary-light);
  pointer-events: none;
}
.search-input-btn i {
  display: block;
}
.theme-switcher {
  flex-shrink: 0;
}
</style>