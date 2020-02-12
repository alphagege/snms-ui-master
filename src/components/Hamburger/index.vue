<template>
  <div @click="toggleClick" style="padding: 0 15px;">
    <coframe-icon name="bars"></coframe-icon>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    // 展开还是闭合，图标方向标识
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
