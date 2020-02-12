<template>
  <div class="co-container-ghost-bs">
    <div class="co-container-ghost-bs__header" ref="header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="co-container-ghost-bs__body" ref="wrapper">
      <div>
        <slot />
      </div>
    </div>
    <div class="co-container-ghost-bs__footer" ref="footer" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'co-container-card-bs',
  mixins: [
    bs
  ]
}
</script>
