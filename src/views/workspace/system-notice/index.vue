<template>
  <co-container>
    <split-pane :default-percent="35" :min-percent="35" split="vertical">
      <template slot="paneL">
        <div class="left-container">
          <co-container better-scroll type="card">
            <div class="slot-header" slot="header">
              <coframe-icon class="mr-5" name="tree"></coframe-icon>
              <span>菜单树</span>
            </div>
            <el-card>
              <el-tree
                :data="menuTree"
                :expand-on-click-node="false"
                :render-content="renderContent"
                @node-click="showMenuInfo"
                default-expand-all
                node-key="id"
              ></el-tree>
            </el-card>
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
let id = 1000;
import { systemMenuApi } from '@/api'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SystemNotice',
  components: {},
  props: {},
  data() {
    return {
      parentList: []
    }
  },
  watch: {},
  computed: {
    menuTree() {
      // if (this.allMenus[3].children) {
      //   this.allMenus[3].children[1].leaf = false;
      //   console.log(this.allMenus[3].children[1].leaf);
      // }

      // let node = this.allMenus[3].children[1];
      // node.leaf = false;
      let tree = [{
        menuName: "应用菜单",
        id: 9999,
        children: this.allMenuInfo
      }]
      return tree;
    },
    ...mapGetters({
      allMenuInfo: 'coframe/menu/allMenuInfo',
    })
  },
  mixins: [],
  methods: {
    ...mapActions('coframe/menu', [
      'getAllMenuInfo'
    ]),
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      console.log(node)
      console.log(data.id);
      console.log(data);
      if (data.id === 9999) {
        return (
          <span class="custom-tree-node">
            <span>
              <i class="el-icon-folder-opened mr-5">
              </i>
              {data.menuName}
            </span>
            <span style="width:98px">
              <el-button size="mini" style="width:100%" type="primary" icon="el-icon-plus" on-click={() => this.append(data)}>添加主菜单</el-button>
            </span>
          </span >
        );
      } else {
        return (
          <span class="custom-tree-node">
            <span>
              <i class="el-icon-document mr-5" ></i>
              {data.menuName}
            </span>
            <span>
              <el-button size="mini" icon="el-icon-plus" on-click={() => this.append(data)}></el-button>
              <el-button size="mini" icon="el-icon-minus" on-click={() => this.remove(node, data)}></el-button>
            </span>
          </span >
        );
      }

    },
    // 拉取菜单
    getSystemMenu() {
      this.getAllMenuInfo();
    },
    showMenuInfo(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
    }
  },
  created() {
    this.getSystemMenu()
  },
  mounted() { }
}
</script>
<style lang="scss" scoped>
/deep/ .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
}
.slot-header {
  font-size: 14px;
  font-weight: 600;
}
</style>