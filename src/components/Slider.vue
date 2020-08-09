<template>
  <div
    class="slider-wrap"
    ref="sliderWrap"
    :style="`width: ${width}px`"
    @mousedown="startDrag"
    @touchmove="touchmove"
  >
    <div class="slider">
      <div
        class="slider-inner"
        :style="`width: ${currentWidth || ownCurrentWidth}%`"
      />
    </div>

    <SliderOverlay
      v-show="isMouseDown"
      @dragging="dragging"
      @endDrag="endDrag"
    />
  </div>
</template>

<script>
import SliderOverlay from '@/components/SliderOverlay'
export default {
  components: { SliderOverlay },
  props: {
    currentWidth: {
      type: [Number, String],
    },
    width: {
      type: [Number, String],
      default: 'auto',
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
      const offsetX = event.offsetX - this.$refs.sliderWrap.getBoundingClientRect().left;
      if(offsetX < 0 || offsetX > this.sliderWrap.width) return;
      this.$emit('dragging', this.getOffsetXPercent(offsetX));
    },
    endDrag() {
      this.isMouseDown = false;
      this.$emit('endDrag');
    },
    touchmove(event) {
      event.preventDefault();
      const offsetX = event.touches[0].clientX - this.sliderWrap.left;
      if(offsetX < 0 || offsetX > this.sliderWrap.width) return;
      this.$emit('dragging', this.getOffsetXPercent(offsetX));
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
  background: var(--secondary-light);
}
.slider-inner {
  height: 100%;
  background: var(--contrast-light);
  position: relative;
  display: flex;
  align-items: center;
}
.slider-inner:after {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  background: var(--contrast-light);
  border-radius: 50px;
  position: absolute;
  right: 0;
  transform: translateX(50%) scale(0);
  transition: .2s;
}
.slider-wrap:hover .slider-inner:after {
  transform: translateX(50%) scale(1);
}
</style>