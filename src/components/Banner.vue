<template>
  <div class="banner">
    <transition name="banner" @after-enter="afterEnter" @before-leave="beforeLeave">
      <div v-if="show" class="banner-content">
        <slot></slot>
      </div>
    </transition>
    <div class="banner-overlay"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    start() {
      this.show = true;
    },
    afterEnter() {
      setTimeout(() => {
        this.show = false;
      }, 1500)
    },
    beforeLeave() {
      this.$emit('beforeLeave');
    },
  },
}
</script>

<style scoped>
.banner-content {
  color: #fff;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1E1E1E;
  display: none;
}
.banner-content + .banner-overlay {
  display: block;
}
.banner-enter,
.banner-leave-to {
  opacity: 0;
  transform: scale(0.950);
}
.banner-enter-active,
.banner-leave-active {
  transition: .1s;
}
</style>