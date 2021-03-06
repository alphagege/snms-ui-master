<template>
  <div class="tags-view-container" id="tags-view-container">
    <scroll-pane class="tags-view-wrapper" ref="scrollPane">
      <!--@click.middle.native--点击鼠标中轮-->
      <!-- @contextmenu.prevent.native="openMenu(tag, $event)"点击鼠标右键，阻止默认行为，展开菜单 -->
      <router-link
        :class="isActive(tag) ? 'active' : ''"
        :key="tag.path"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
        class="tags-view-item"
        ref="tag"
        tag="span"
        v-for="tag in visitedViews"
      >
        {{ tag.title }}
        <span
          @click.prevent.stop="closeSelectedTag(tag)"
          class="el-icon-close"
          v-if="!tag.meta.affix"
        />
      </router-link>
    </scroll-pane>
    <ul :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu" v-show="visible">
      <!-- <li @click="refreshSelectedTag(selectedTag)">Refresh</li> -->
      <li
        @click="closeSelectedTag(selectedTag)"
        v-if="!(selectedTag.meta && selectedTag.meta.affix)"
      >关闭</li>
      <li @click="closeOthersTags">关闭其它</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.coframe.tagsView.visitedViews
    },
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    $route() {
      // 监听路由变化，执行addTags方法
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
    // console.log(this)
    // alert();
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('coframe/tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route // 当前点击的路由名称
      // 如果名称存在，执行vuex中的 addView方法，将当前路由对象穿进去
      if (name) {
        this.$store.dispatch('coframe/tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('coframe/tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    // refreshSelectedTag(view) {
    //   this.$store.dispatch("coframe/tagsView/delCachedView", view).then(() => {
    //     const { fullPath } = view;
    //     this.$nextTick(() => {
    //       this.$router.replace({
    //         path: "/redirect" + fullPath
    //       });
    //     });
    //   });
    // },
    // 点击关闭tagviews
    closeSelectedTag(view) {
      this.$store
        .dispatch('coframe/tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store
        .dispatch('coframe/tagsView/delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag()
        })
    },
    closeAllTags(view) {
      this.$store.dispatch('coframe/tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      // border: 1px solid #d8dce5;
      // color: #495060;
      // background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      // &:first-of-type {
      //   margin-left: 15px;
      // }
      // &:last-of-type {
      //   margin-right: 15px;
      // }
      &.active {
        // background-color: #42b983;
        // color: #fff;
        // border-color: #42b983;
        &::before {
          content: '';
          // background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
    // .tags-view-item:first-child {
    //   margin-left: 0;
    // }
  }
  .contextmenu {
    margin: 0;
    // background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    // color: #333;
    // box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        // background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
