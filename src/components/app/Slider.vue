<template>
  <div class="slider-wrap">
    <div class="slider">
      <div :style="`width: ${value || 0}%`" class="input-fill"/>
      <input :value="value || 0" @input="onInput" class="input" type="range">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
  },
}
</script>

<style scoped>
.slider-wrap {
  width: 100%;
  height: 11px;
  padding: 4px 0;
  transition: padding .2s;
}
.slider-wrap:hover {
  padding: 3px 0;
}
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--secondary-light);
}
.input-fill {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  background: var(--contrast-light);
}
.input {
  -webkit-appearance: none;
  appearance: none;
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  margin: 0;
  outline: 0;
  cursor: pointer;
}
.input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: var(--contrast-light);
  border-radius: 50px;
  transform: scale(0);
  transition: transform .2s;
}
.slider-wrap:hover .input::-webkit-slider-thumb {
  transform: scale(1);
}

@media (hover: none) {
  .slider-wrap:hover {
    padding: 4px 0;
  }
  .input::-webkit-slider-thumb {
    transform: scale(1);
  }
}
</style>