<template>
  <div class="home">
    <Search/>
    <Results/>
    <Player/>
  </div>
</template>

<script>
import Search from '../components/Search';
import Results from '../components/Results';
import Player from '../components/Player';

export default {
  components: { Search, Player, Results },
}
</script>

<style scoped>
.home {
  height: 100%;
  background: #202020;
  padding: 10px 15px;
}
</style>