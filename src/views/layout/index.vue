<template>
  <div :class="classObj" :style="styleLayoutMainGroup" class="app-wrapper">
    <div
      @click="handleClickOutside"
      class="drawer-bg"
      v-if="device === 'mobile' && sidebar.opened"
    />
    <!-- 半透明遮罩 -->
    <div class="coframe-layout-header-aside-mask"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div>
        <navbar />
        <tags-view></tags-view>
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import TagsView from './components/TagsView'
import AppMain from './components/AppMain'
// console.log(ResizeMixin)
export default {
  name: 'Layout',
  data() {
    return {}
  },

  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters({
      sidebar: 'coframe/app/sidebar',
      device: 'coframe/app/device',
      themeActiveSetting: 'coframe/theme/activeSetting'
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // 隐藏侧边栏所用的样式
        openSidebar: this.sidebar.opened, // 打开侧边栏所用的样式
        withoutAnimation: this.sidebar.withoutAnimation, // 暂时不知
        mobile: this.device === 'mobile' // 设备分辨率标识

      }
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      // console.log(this.themeActiveSetting)
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },
  async beforeCreate() {
    // // 用户登录后从数据库加载用户个人信息
    // let { data, status } = await this.$store.dispatch('coframe/user/load')
    // if (status === 200) {
    //   // 成功拉取用户信息
    //   // 用户登录后从本地数据库加载一系列的设置
    //   await this.$store.dispatch('coframe/theme/load')
    //   // 从数据库加载用户菜单信息,登陆页默认不成功,刷新页面重新执行
    //   await this.$store.dispatch('coframe/menu/load', this, data.id)
    // }

  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('coframe/app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss" scoped>
// @import '~@/styles/mixin.scss';
// @import '~@/styles/variables.scss';
// 注册主题
// @import '~@/styles/theme/register.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
