<template>
  <div class="login">
    <component :is="loginType"></component>
  </div>
</template>

<script>
import Normal from './login-normal.vue'
export default {
  name: 'index',
  components: {
    Normal
  },
  props: {},
  data () {
    return {
      loginType: 'Normal'
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
}
</style>
