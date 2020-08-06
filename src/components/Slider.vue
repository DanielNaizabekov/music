<template>
  <div class="slider-wrap" ref="sliderWrap" @mousedown="startDrag">
    <div class="slider">
      <div
        class="slider-inner"
        :style="`width: ${currentWidth || ownCurrentWidth}%`"
      />
    </div>

    <div
      class="slider-overlay"
      v-show="isMouseDown"
      @mousemove="dragging"
      @mouseup="endDrag"
    />
  </div>
</template>

<script>
export default {
  props: {
    currentWidth: {
      type: [Number, String],
    },
  },
  data() {
    return {
      sliderWrap: null,
      isMouseDown: false,
      ownCurrentWidth: 0,
    };
  },
  methods: {
    getOffsetXPercent(offsetX) {
      const offsetXPercent = offsetX / this.$refs.sliderWrap.offsetWidth * 100;
      return this.ownCurrentWidth = offsetXPercent;
    },
    startDrag(event) {
      this.isMouseDown = true;
      this.$emit('startDrag', this.getOffsetXPercent(event.offsetX));
    },
    dragging(event) {
      const offsetX = event.offsetX - this.sliderWrap.left;
      if(offsetX < 0 || offsetX > this.sliderWrap.width) return;
      this.$emit('dragging', this.getOffsetXPercent(offsetX));
    },
    endDrag() {
      this.isMouseDown = false;
      this.$emit('endDrag');
    },
  },
  mounted() {
    this.sliderWrap = this.$refs.sliderWrap.getBoundingClientRect();
  },
}
</script>

<style scoped>
.slider-wrap {
  width: 100%;
  height: 11px;
  padding: 4px 0;
  cursor: pointer;
  transition: .2s;
}
.slider-wrap:hover {
  padding: 3px 0;
}
.slider {
  height: 100%;
  background: #4D4D4D;
}
.slider-inner {
  height: 100%;
  background: #ccc;
  position: relative;
  display: flex;
  align-items: center;
}
.slider-inner:after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50px;
  position: absolute;
  right: 0;
  transform: translateX(50%) scale(0);
  transition: .2s;
}
.slider-wrap:hover .slider-inner:after {
  transform: translateX(50%) scale(1);
}
.slider-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>