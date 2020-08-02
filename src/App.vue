<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './views/Home';

export default {
  name: 'App',
  components: { Home },
}
</script>

<style>
html, body, #app {
  height: 100%;
}
body {
  font-family: 'Montserrat', sans-serif;
}
* {
  box-sizing: border-box;
}
</style>