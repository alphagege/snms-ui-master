<template>
  <co-container>
    <split-pane :default-percent="35" :min-percent="35" @resize="resize" split="vertical">
      <template slot="paneL">
        <div class="left-container">
          <co-container type="card">
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
            <p>1111</p>
          </co-container>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container"></div>
      </template>
    </split-pane>
  </co-container>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {

    }
  },
  watch: {},
  computed: {},
  mixins: [],
  methods: {
    resize() {
      // console.log('resize')
    }
  },
  created() { },
  mounted() { }
}
</script>
<style lang="scss" scoped>
.system_menu {
  position: relative;
  height: 100vh;
}

.left-container {
  height: 100%;
}

.right-container {
  height: 100%;
}
</style>
