<template>
  <div class="co-container-card">
    <div class="co-container-card__header" ref="header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="co-container-card__body" ref="body">
      <div class="co-container-card__body-card">
        <slot />
      </div>
    </div>
    <div class="co-container-card__footer" ref="footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import scroll from './mixins/normal'
export default {
  name: 'co-container-card',
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
