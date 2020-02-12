<template>
  <div class="co-container-card-bs">
    <div class="co-container-card-bs__header" ref="header" v-if="$slots.header">
      <slot name="header" />
    </div>
    <div class="co-container-card-bs__body" ref="wrapper">
      <div class="co-container-card-bs__body-wrapper-inner">
        <div class="co-container-card-bs__body-card">
          <slot />
        </div>
      </div>
    </div>
    <div class="co-container-card-bs__footer" ref="footer" v-if="$slots.footer">
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
