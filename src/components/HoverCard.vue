<template>
  <div class="hover-card">
    <div class="hover-card-content-wrap" ref="hoverCardContentWrap" :style="style">
      <div class="hover-card-content-border">
        <slot></slot>
      </div>
    </div>
    <slot name="activator"></slot>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'top',
    },
  },
  data() {
    return {
      offsetWidth: 0,
    };
  },
  computed: {
    style() {
      const positionStyle = {
        top: {
          translateY: 'translateY(-100%)',
          top: '0',
        },
        bottom: {
          translateY: 'translateY(100%)',
          bottom: '0',
        },
      };
      return {
        transform: `translateX(${this.offsetWidth}px) ${positionStyle[this.position].translateY}`,
        ...positionStyle[this.position],
      };
    },
  },
  mounted() {
    const rect = this.$refs.hoverCardContentWrap.getBoundingClientRect();
    const offsetLeft = rect.left;
    const offsetRight = rect.right;
    const windowWidth = window.innerWidth;
    if(offsetLeft < 0) {
      this.offsetWidth = -offsetLeft + 5;
    } else if(offsetRight > windowWidth) {
      this.offsetWidth = -(offsetRight - windowWidth) - 5;
    }
  },
}
</script>

<style scoped>
.hover-card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
}
.hover-card:hover .hover-card-content-wrap {
  opacity: 1;
  pointer-events: auto;
}
.hover-card-content-wrap {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  border-bottom: 8px solid transparent;
  transition: .1s;
}
.hover-card-content-border {
  padding: 15px 20px;
  background: #202020;
  border: 1px solid #4D4D4D;
  border-radius: 3px;
}
</style>