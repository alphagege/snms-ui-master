<template>
  <el-table :data="list" v-bind="table">
    <el-table-column align="center" prop="title" width="160" />
    <el-table-column label="预览" width="120">
      <div
        :style="{
          backgroundImage: `url(${$baseUrl}${scope.row.preview})`
        }"
        class="theme-preview"
        slot-scope="scope"
      ></div>
    </el-table-column>
    <el-table-column align="center" prop="address">
      <template slot-scope="scope">
        <el-button
          icon="el-icon-check"
          round
          type="success"
          v-if="activeName === scope.row.name"
        >已激活</el-button>
        <el-button @click="handleSelectTheme(scope.row.name)" round v-else>使用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'theme-list',
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('coframe/theme', [
      'list',
      'activeName'
    ])
  },
  methods: {
    ...mapActions('coframe/theme', [
      'set'
    ]),
    handleSelectTheme (name) {
      this.set(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
