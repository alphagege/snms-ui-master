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
              <el-input
                class="mb-5"
                placeholder="查找菜单"
                prefix-icon="el-icon-search"
                size="mini"
                v-model="filterMenuText"
              ></el-input>

              <el-tree
                :data="menuTree"
                :default-expanded-keys="defaultExpandedKeys"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                :render-content="renderContent"
                @node-click="showMenuInfo"
                @node-collapse="collapseMenuList"
                @node-expand="expandMenuList"
                empty-text="暂无数据"
                highlight-current
                node-key="id"
                ref="tree"
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

                <el-button @click="updateMenu" class="fr" size="mini" type="primary">保存</el-button>
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
                      <el-switch v-model="menuForm.relativePath"></el-switch>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="是否启用" prop="enable">
                      <el-switch v-model="menuForm.enable"></el-switch>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="菜单图标" prop="menuIcon">
                      <el-input v-model="menuForm.menuIcon"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-card>
          </co-container>
        </div>
      </template>
    </split-pane>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="resetForm('menuFormAdd')"
      title="添加菜单"
      width="50%"
    >
      <el-form
        :model="menuFormAdd"
        :rules="menuRules"
        label-width="100px"
        ref="menuFormAdd"
        size="mini"
      >
        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input placeholder="请输入菜单名称" v-model="menuFormAdd.menuName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单代码" prop="menuId">
              <el-input placeholder="请输入菜单代码" v-model="menuFormAdd.menuId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="菜单显示顺序" prop="menuOrder">
              <el-input placeholder="请输入显示顺序" v-model="menuFormAdd.menuOrder"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单图标" prop="menuIcon">
              <el-input placeholder="请输入菜单图标名" v-model="menuFormAdd.menuIcon"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="16">
          <el-col :span="12">
            <el-form-item label="是否启用" prop="enable">
              <el-switch v-model="menuFormAdd.enable"></el-switch>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="是否为叶子节点" prop="leaf">
              <el-switch v-model="menuFormAdd.leaf"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16" v-if="menuFormAdd.leaf">
          <el-col :span="12">
            <el-form-item label="菜单打开方式" prop="openMode">
              <el-select placeholder="请选择打开方式" v-model="menuFormAdd.openMode">
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
            <el-form-item :label="'菜单/组件路径'" prop="menuPath">
              <el-input placeholder="请输入菜单路径" v-model="menuFormAdd.menuPath"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="addMenu" type="primary">确 定</el-button>
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
        menuIcon: "", // 菜单图标
        menuPath: "", // 菜单路径
        menuOrder: "", // 显示顺序
        menuLevel: 1, // 菜单层级
        leaf: false, // 是否为叶子节点
        enable: false, // 是否启用
        rootId: "",
        parentId: "",
        children: []
      },
      menuRules: {
        menuName: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          // {
          //   pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
          //   message: "只允许输入大小写字母、数字、下划线、中文",
          //   trigger: "blur"
          // }
        ],
        menuId: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          },
          // {
          //   pattern: /^[a-zA-Z0-9_]+$/,
          //   message: "只允许输入大小写字母、数字、下划线",
          //   trigger: "blur"
          // }
        ],
        // menuIcon: [
        //   {
        //     required: true,
        //     message: "不能为空",
        //     trigger: "blur"
        //   }
        // ],
        menuOrder: [
          {
            type: "number",
            message: "请输入数字",
            required: false,
            trigger: "blur",
            transform(value) {
              return Number(value);
            }
          }
        ]
      },
      menuFormAdd: {
        menuName: "", // 菜单名称
        menuId: "", // 菜单代码
        openMode: "", // 菜单打开方式
        menuIcon: "", // 菜单图标
        menuPath: "", // 菜单路径
        menuOrder: "", // 显示顺序
        menuLevel: 1, // 菜单层级
        leaf: false, // 是否为叶子节点
        enable: true, // 是否启用
        rootId: "",
        parentId: "",
        children: []
      },
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
      dialogVisible: false,
      // 所加菜单的父节点id
      clickMenuId: '',
      // 检索条件
      filterMenuText: '',
      // 默认展开的节点
      defaultExpandedKeys: [9999]
    }
  },
  watch: {
    filterMenuText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    menuTree() {
      let tree = [{
        menuId: "appRoot",
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
    filterNode(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    showAddMenuForm(data) {
      this.dialogVisible = true;
      this.clickMenuId = data.menuId || ""
    },
    showRemoveMenuForm(node, data) {
      this.clickMenuId = data.menuId || ""
      this.$confirm('此操作将永久删除该菜单以及其子菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.removeMenu()
      }).catch(() => {
      });
    },
    addMenu() {
      if (this.clickMenuId) this.menuFormAdd.parentId = this.clickMenuId;
      this.$refs.menuFormAdd.validate(async valid => {
        if (valid) {
          let { data, status } = await systemMenuApi.createSystemMenu({
            data: this.menuFormAdd
          })
          if (status === 200) {
            this.$message({
              message: '创建成果',
              type: 'success'
            })
            this.dialogVisible = false;
            this.getAllMenuInfo();
          }
        }
      });
    },
    async removeMenu(node, menuData) {
      let { data, status } = await systemMenuApi.deleteSystemMenu({
        pathParams: {
          menuId: this.clickMenuId
        }
      });
      if (status === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getAllMenuInfo();
      }
    },
    updateMenu() {
      this.$refs.menuForm.validate(async valid => {
        if (valid) {
          let { data, status } = await systemMenuApi.updateSystemMenu({
            pathParams: {
              menuId: this.menuForm.menuId
            },
            data: this.menuForm
          });
          if (status === 200) {
            this.$message({
              message: "保存成功",
              type: 'success'
            })
            this.getAllMenuInfo();
          }
        }
      });
    },
    renderContent(h, { node, data, store }) {
      // console.log(node)
      // console.log(data)
      // console.log(store)
      let btns =
        <span>
          {!data.leaf && (
            <el-button icon="el-icon-plus" size="mini" on-click={() => this.showAddMenuForm(data)}></el-button>

          )} {" "}
          {data.childrenCount === 0 && (
            <el-button icon="el-icon-minus" size="mini" on-click={() => this.showRemoveMenuForm(node, data)}></ el-button>
          )}
        </span >

      if (data.id === 9999) {
        return (
          <span class="custom-tree-node">
            <span>
              <i class="el-icon-folder-opened mr-5">
              </i>
              {data.menuName}
            </span>
            <span >
              <el-button type="primary" size="mini" icon="el-icon-plus" on-click={() => this.showAddMenuForm(data)}></el-button>
            </span>
          </span >
        );
      }
      else {
        return (
          <span class="custom-tree-node">
            <span>
              <coframe-icon class="mr-5" name={data.menuIcon} ></coframe-icon>
              {data.menuName}
            </span>
            {btns}
          </span >
        );
      }

    },
    // 展开节点记录展开节点id
    expandMenuList(data, node, store) {
      if (!this.defaultExpandedKeys.find((value, index, arr) => value === data.id)) {
        this.defaultExpandedKeys.push(data.id)
      }
    },
    // 闭合节点记录
    collapseMenuList(data, node, store) {
      this.defaultExpandedKeys.splice(this.defaultExpandedKeys.findIndex(item => item.id === data.id), 1)
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
    },

    resetForm(FormName) {
      this.$refs[FormName].resetFields()
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