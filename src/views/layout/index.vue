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
import { mapState, mapGetters } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import TagsView from './components/TagsView'
import AppMain from './components/AppMain'
console.log(ResizeMixin)
export default {
  name: 'Layout',
  data () {
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
    // 这里用mapGetters引入sider在下面的classObj会报错，这么用就不会报错
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    ...mapGetters({
      themeActiveSetting: 'theme/activeSetting'
    }),
    classObj () {
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
    styleLayoutMainGroup () {
      // console.log(this.themeActiveSetting)
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    }
  },

  mounted () { },

  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
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
