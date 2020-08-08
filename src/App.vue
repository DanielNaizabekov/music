<template>
  <div id="app" ref="app">
    <Home class="home-wrap" :class="{scale}"/>
    <Banner ref="banner" @beforeLeave="beforeThemeBannerLeave">
      <h1>{{ themeBannerTexts[theme] }}</h1>
    </Banner>
  </div>
</template>

<script>
import Home from './views/Home';
import Banner from '@/components/Banner';
import { mapGetters } from 'vuex';
import { LIGHT_THEME, DARK_THEME } from '@/consts';

const themeBannerTexts = {
  [LIGHT_THEME]: 'Light mode',
  [DARK_THEME]: 'Dark mode',
};
export default {
  name: 'App',
  components: { Home, Banner },
  data() {
    return {
      scale: false,
      themeBannerTexts,
    };
  },
  computed: {
    ...mapGetters(['theme']),
  },
  watch: {
    theme(v) {
      this.$refs.app.dataset.theme = v;
      this.showThemeBanner();
    },
  },
  methods: {
    showThemeBanner() {
      this.scale = true;
      setTimeout(() => {
        this.$refs.banner.start();
      }, 80);
    },
    beforeThemeBannerLeave() {
      setTimeout(() => {
        this.scale = false;
      }, 100);
    },
  },
}
</script>

<style>
:root {
  --color: red;
}
[data-theme="DARK_THEME"] {
  --color: blue;
}
html, body {
  height: 100%;
}
body {
  font-family: 'Montserrat', sans-serif;
}
#app {
  user-select: none;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
.home-wrap.scale {
  transform: scale(1.06);
}
.btn {
  background: transparent;
  border: 1px solid #fff;
  border-radius: 20px;
  padding: 8px 20px;
  color: var(--color);
  font-weight: 100;
  cursor: pointer;
  outline: none;
}
.btn:hover {
  background: #121212;
}
.btn:active {
  background: #202020;
}
</style>