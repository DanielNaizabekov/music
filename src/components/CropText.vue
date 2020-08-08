<template>
  <div ref="cropTextWrap" class="crop-text-wrap">
    <h4
      class="crop-text"
      ref="cropText"
      :style="`transform: translate(-${overflowWidth}px); transition: ${transition};`"
      @transitionend.stop="transitionend"
    >
      {{ text }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      overflowWidth: 0,
      transition: 'none',
    };
  },
  watch: {
    text() {
      this.overflowWidth = 0;
      this.transition = 'none';
      this.startAnimate();
    },
  },
  methods: {
    transitionend() {
      this.transition = 'none';
      setTimeout(() => {
        this.overflowWidth = 0;
        
        this.startAnimate();
      }, 1000);
    },
    startAnimate() {
      setTimeout(() => {
        const { offsetWidth: visibleWidth } = this.$refs.cropTextWrap;
        const { offsetWidth: fullWidth } = this.$refs.cropText;
        if(fullWidth < visibleWidth) return;
        this.transition = (fullWidth - visibleWidth) / 5 * 400 + 'ms';
        this.overflowWidth = fullWidth - visibleWidth;
      }, 5000);
    },
  },
  mounted() {
    this.startAnimate();
  },
}
</script>

<style scoped>
.crop-text-wrap {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
.crop-text {
  margin: 0;
  font-weight: 100;
  display: inline-block;
}
</style>