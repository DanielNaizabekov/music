<template>
  <label class="switch-wrap">
    <div class="label">Dark mode</div>
    <div class="switch">
      <input @change="$emit('change', $event)" type="checkbox">
      <div class="slider round"></div>
    </div>
  </label>
</template>

<style scoped>
.switch-wrap {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.label {
  margin-right: 10px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 48px;
  border-radius: 50px;
  border: 2px solid var(--contrast-light);
  padding: 2px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}
.slider {
  width: 17px;
  height: 17px;
  background: #d59999;
  border-radius: 50px;
  transition: .2s;
}
.switch-wrap:hover .slider {
  background: var(--contrast);
}
input:checked + .slider {
  background: #aee6a3;
  margin-left: 23px;
}
</style>