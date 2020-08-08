<template>
  <div
    class="slider-overlay"
    ref="sliderOverlay"
    @mousemove="dragging"
    @mouseup="endDrag"
  />
</template>

<script>
export default {
  methods: {
    dragging(event) {
      this.$emit('dragging', event);
    },
    endDrag() {
      this.$emit('endDrag');
    },
  },
  mounted() {
    this.$refs.sliderOverlay.style.display = 'block';
    setTimeout(() => {
      const rect = this.$refs.sliderOverlay.getBoundingClientRect();
      if(rect.left > 0 || rect.top > 0) {
        this.$refs.sliderOverlay.style.left = -rect.left + 'px';
        this.$refs.sliderOverlay.style.top = -rect.top + 'px';
      }
      this.$refs.sliderOverlay.style.display = 'none';
    }, 1000);
  },
}
</script>

<style>
.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>