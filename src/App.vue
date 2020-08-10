<template>
  <div id="app" ref="app">
    <Home :isThemeChanging="isThemeChanging"/>
    <Banner ref="banner" @beforeLeave="beforeThemeBannerLeave">
      <h1>{{ themeBannerTexts[theme] }}</h1>
    </Banner>
  </div>
</template>

<script>
import Home from './views/Home';
import Banner from '@/components/app/Banner';
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
      isThemeChanging: false,
      themeBannerTexts,
    };
  },
  computed: {
    ...mapGetters(['theme']),
  },
  watch: {
    theme() {
      this.showThemeBanner();
    },
  },
  methods: {
    showThemeBanner() {
      this.isThemeChanging = true;
      setTimeout(() => {
        this.$refs.app.dataset.theme = this.theme;
        this.$refs.banner.start();
      }, 200);
    },
    beforeThemeBannerLeave() {
      setTimeout(() => {
        this.isThemeChanging = false;
      }, 200);
    },
  },
}
</script>

<style>
:root {
  --primary: #f2f2f2;
  --primary-light: #F9FDFF;
  --primary-dark: #fff;
  --secondary: #F2F2F2;
  --secondary-light: #BABABA;
  --contrast: #191919;
  --contrast-light: #32323D;
  --font-weight: 600;
}
[data-theme="DARK_THEME"] {
  --primary: #181818;
  --primary-light: #202020;
  --primary-dark: #121212;
  --secondary: #373737;
  --secondary-light: #4D4D4D;
  --contrast: #fff;
  --contrast-light: #ccc;
  --font-weight: 100;
}
[data-invert="true"] {
  filter: invert(1);
}
[data-theme="DARK_THEME"] [data-invert="true"] {
  filter: none;
}

html, body {
  height: 100%;
}
#app {
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: var(--contrast);
  font-family: 'Montserrat', sans-serif;
}
* {
  box-sizing: border-box;
}
.btn {
  background: transparent;
  border: 1px solid var(--contrast);
  border-radius: 20px;
  padding: 8px 20px;
  font-weight: var(--font-weight);
  cursor: pointer;
  outline: none;
  color: var(--contrast);
}
.btn:hover {
  background: var(--primary-dark);
}
.btn:active {
  background: var(--primary-light);
}
.round-btn {
  border-radius: 50px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--secondary);
  cursor: pointer;
  user-select: none;
}
.round-btn:hover {
  background: var(--secondary-light);
}
.round-btn:active {
  background: var(--secondary);
}
.material-icons {
  user-select: none;
}
</style>