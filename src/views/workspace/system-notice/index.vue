<template>
  <co-container>
    <split-pane :default-percent="35" :min-percent="35" split="vertical">
      <!-- 左侧面板 -->
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
                empty-text="暂无数据"
                highlight-current
                node-key="id"
              ></el-tree>
            </el-card>
          </co-container>
        </div>
      </template>
      <template slot="paneR">
        <!-- 右侧面板 -->
        <div class="right-container">
          <co-container better-scroll type="card">
            <div class="slot-header" slot="header">
              <coframe-icon class="mr-5" name="edit"></coframe-icon>
              <span>菜单信息</span>
            </div>
            <el-card>
              <div class="clearfix" slot="header">
                <el-button
                  class="tip-text"
                  size="mini"
                  type="text"
                  v-if="!menuForm.leaf"
                >注意：非叶子节点的菜单需要添加组件路径！</el-button>

                <el-button class="fr" size="mini" type="primary">保存</el-button>
              </div>
              <el-form
                :model="menuForm"
                :rules="menuRules"
                label-width="100px"
                ref="menuForm"
                size="mini"
              >
                <el-row :gutter="16">
                  <el-col :span="12">
                    <el-form-item label="菜单名称" prop="menuName">
                      <el-input v-model="menuForm.menuName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="菜单代码" prop="menuId">
                      <el-input v-model="menuForm.menuId"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-if="menuForm.leaf">
                    <el-form-item label="菜单打开方式" prop="openMode">
                      <el-select v-model="menuForm.openMode">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in menuOpenWay"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item :label="menuForm.leaf?'菜单路径':'组件路径'" prop="menuPath">
                      <el-input v-model="menuForm.menuPath"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="显示顺序" prop="menuOrder">
                      <el-input v-model="menuForm.menuOrder"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="相对路径" prop="relativePath">
                      <!-- <el-input v-model="menuForm.relativePath"></el-input> -->
                      <el-switch v-model="menuForm.relativePath"></el-switch>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="是否启用" prop="enable">
                      <el-switch v-model="menuForm.enable"></el-switch>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="上级菜单" prop="parentId">
                      <el-select v-model="menuForm.parentId">
                        <el-option
                          :key="item.id"
                          :label="item.menuName"
                          :value="item.menuId"
                          v-for="item in parentList"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>-->
                </el-row>
              </el-form>
            </el-card>
          </co-container>
        </div>
      </template>
    </split-pane>
    <el-dialog :visible.sync="dialogVisible" title="添加菜单" width="40%">
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
      menuForm: {
        menuName: "", // 菜单名称
        menuId: "", // 菜单代码
        openMode: "", // 菜单打开方式
        menuPath: "", // 菜单路径
        menuOrder: "", // 显示顺序
        relativePath: false, // 相对路径
        enable: false, // 是否启用
      },
      menuRules: {},
      // 菜单打开方式
      menuOpenWay: [
        {
          value: "in_self",
          label: "内部链接(当前页)"
        },
        {
          value: "in_blank",
          label: "内部链接(新增tab页)"
        },
        {
          value: "out_self",
          label: "外部链接(当前页)"
        },
        {
          value: "out_blank",
          label: "外部链接(新增tab页)"
        }
      ],
      dialogVisible: false
      // 上级菜单
      // parentList: []
    }
  },
  watch: {},
  computed: {
    menuTree() {
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
      this.dialogVisible = true;
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      let btns = <span>
        {!data.leaf && (
          <el-button icon="el-icon-plus" size="mini" on-click={() => this.append(data)}></el-button>

        )} {" "}
        {data.childrenCount === 0 && (
          <el-button icon="el-icon-minus" size="mini" on-click={() => this.remove(node, data)}></ el-button>
        )}
      </span>

      if (data.id === 9999) {
        return (
          <span class="custom-tree-node">
            <span>
              <i class="el-icon-folder-opened mr-5">
              </i>
              {data.menuName}
            </span>
            <span >
              <el-button type="primary" size="mini" icon="el-icon-plus" on-click={() => this.append(data)}></el-button>
            </span>
          </span >
        );
      }
      else {
        return (
          <span class="custom-tree-node">
            <span>
              <i class="el-icon-document mr-5" ></i>

              {data.menuName}
            </span>
            {btns}
          </span >
        );
      }

    },
    // 拉取菜单
    getSystemMenu() {
      this.getAllMenuInfo();
    },
    // 点击tree节点，展示当前节点的菜单信息
    async showMenuInfo(data, node, event) {
      if (data.id === 9999) {
        return
      }
      this.menuForm = Object.assign({}, data);
      // console.log(systemMenuApi)
      // let res = await systemMenuApi.getSystemMenu({
      //   queryParams: {
      //     containLeaf: false
      //   }
      // })
      // if (res.status === 200) {
      //   this.parentList = [
      //     {
      //       menuId: "appRoot",
      //       menuName: "应用菜单",
      //       id: 9999
      //     },
      //     ...res.data
      //   ];
      //   if (!this.menuForm.parentId) {
      //     this.menuForm.parentId = "appRoot";
      //   }
      // }
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
.right-container .el-col {
  height: 47px;
}
</style>