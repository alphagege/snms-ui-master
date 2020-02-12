<template>
  <div class="co-container-full">
    <div class="co-container-full__header" ref="header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="co-container-full__body" ref="body">
      <slot />
    </div>
    <div class="co-container-full__footer" ref="footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'co-container-full',
  mixins: [
    scroll
  ],
  mounted () {
    // 增加滚动事件监听
    this.addScrollListener()
  },
  beforeDestroy () {
    // 移除滚动事件监听
    this.removeScrollListener()
  }
}
</script>
