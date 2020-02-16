/*
 * @Author: dongwenjie 
 * @Date: 2020-02-17 01:09:43 
 * @Description 侧壁栏展开还是折叠组件
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-02-17 01:10:12
 */

<template>
  <div @click="toggleClick" style="padding: 0 15px;">
    <coframe-icon name="bars"></coframe-icon>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    // 展开还是闭合
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
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
