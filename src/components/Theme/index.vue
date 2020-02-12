/*
 * @Author: dongwenjie
 * @Date: 2020-01-19 10:09:52
 * @Last Modified by: dongwenjie
 * @Last Modified time: 2020-01-20 15:14:56
 */
<template>
  <div>
    <el-tooltip content="主题" effect="dark" placement="bottom">
      <coframe-icon @click.native="dialogVisible = true" name="diamond" />
    </el-tooltip>
    <el-dialog :append-to-body="true" :visible.sync="dialogVisible" title="主题" width="600px">
      <theme-list style="margin-top: -25px;" />
    </el-dialog>
  </div>
</template>

<script>
import themeList from './theme-list'
export default {
  name: 'ToggleTheme',
  components: {
    themeList
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    click () {

    },
    change () {

    },
    init () {

    },
    destroy () {

    }
  }
}
</script>
<style lang="scss" scoped>
</style>
