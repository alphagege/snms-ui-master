<template>
  <div class="co-container-full-bs">
    <div class="co-container-full-bs__header" ref="header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="co-container-full-bs__body" ref="wrapper">
      <div class="co-container-full-bs__body-wrapper-inner">
        <slot />
      </div>
    </div>
    <div class="co-container-full-bs__footer" ref="footer" v-if="$slots.footer">
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
